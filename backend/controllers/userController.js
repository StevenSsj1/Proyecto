const { client } = require('../database/connection');
const jwt = require('jsonwebtoken')


const VerificarUsuario = async (correo) => {
  let existe = false;
  const result = await client.query('SELECT * FROM users WHERE email = $1', [correo]);
  if (result.rows.length > 0) {
    existe = true;
  }
  return existe;
};

const createUser = async (req, res) => {
    // Extrae la información del cuerpo de la solicitud
    const { username, email, password, codeDesigner } = req.body;
    const role = 2
    try {
      // Realiza la inserción en la base de datos
      const existeUsuario = await VerificarUsuario(email);
      if (existeUsuario) {
        return res.status(400).json({ error: 'El correo ya está en uso' });
      }
      const result = await client.query(
        'INSERT INTO users (username, email, password, codeDesigner ,roleId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, password, codeDesigner, role])
      // Devuelve la respuesta con el nuevo usuario creado
      res.status(201).json({ success : "Usuario Creado"});
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const authUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar al usuario por el correo en la base de datos
      const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
      const user = result.rows[0];
  
      // Verificar si el usuario no existe o si la contraseña no coincide
      if (!user) {
        return res.status(401).json({ error: 'Correo/Contraseña Incorrecto' });
      }
  
      // Si el usuario existe y la contraseña coincide, generar un token y enviar la respuesta
      const token = createToken(user);
      res.json({ success: 'Login Correcto', token, email });
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      res.status(500).json({ error: 'Error al intentar iniciar sesión. Por favor, intenta nuevamente más tarde.' });
    }
  };


  function createToken(user) {
    const tokenPayload = {
      user_id: user.id,
      user_role: user.role,
    };
    return jwt.sign(tokenPayload, 'TuClaveSecreta', { expiresIn: '1h' });
  }
  
  module.exports = { createUser, authUsuario };
  