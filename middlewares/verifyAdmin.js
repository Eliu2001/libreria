import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.redirect('/login');
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        
        if(usuario.role !== 'admin') {
            return res.status(403).send('Acceso denegado. Solo administradores pueden acceder a esta sección.');
        }
        
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
}
