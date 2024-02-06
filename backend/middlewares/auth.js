const jwt = require('jsonwebtoken');

const chequearToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({ error: 'Acceso denegado' });
    }

    const token = req.headers['authorization'];

    try {
        // Verificar el token con la clave secreta 'TiendaDeRopa'
        const info = jwt.verify(token, 'TuClaveSecreta');
        // Puedes acceder a la información decodificada en 'info'
        req.usuario = info;
        next();
    } catch (error) {
        return res.json({ error: 'El token es incorrecto' });
    }
};

module.exports = { chequearToken };
