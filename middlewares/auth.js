import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.redirect('/login');
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
}