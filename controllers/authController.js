import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const showLogin = (req, res) => {
    res.render('login');
};

export const showRegister = (req, res) => {
    res.render('register');
};

export const register = async (req, res) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await User.create({ username, password: hash});

    res.redirect('/login');
};

export const login = async (req, res) => {
    const { username, password} = req.body;

    const user = await User.findOne({ where: { username }});

    if(!user) {
        return res.render('login', { error: 'User does not exist' });
    }
    const verifyPassword = bcrypt.compareSync(password, user.password);

    if(!verifyPassword) {
        return res.render('login', { error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.cookie('token', token);
    res.redirect('/');
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};