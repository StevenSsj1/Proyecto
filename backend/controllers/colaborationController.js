const { client } = require('../database/connection');


const createColaboration = async (req, res) => {
  // Extrae la información del cuerpo de la solicitud
  const { userDesigner, nameColaboration, description, nameArtist, nameImage, emailDesigner } = req.body;
    // Realiza la inserción en la base de datos
    const result = await client.query(
      'INSERT INTO colaboraciones (userDesigner, nameColaboration, description, nameArtist, nameImage, emailDesigner) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userDesigner, nameColaboration, description, nameArtist, nameImage, emailDesigner]
    );

    // Devuelve la respuesta con la nueva colaboración creada
    res.status(201).json(result.rows[0]);
  };

  const getColaborations = async (req, res) => {
    try {
      // Realiza la consulta a la base de datos para obtener todas las colaboraciones
      const result = await client.query('SELECT * FROM colaboraciones');
  
      // Devuelve la respuesta con todas las colaboraciones
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener colaboraciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = { createColaboration, getColaborations};
