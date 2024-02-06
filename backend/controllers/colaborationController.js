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

  const deleteColaborations = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const result = await client.query('DELETE FROM colaboraciones where id_colab = $1 RETURNING *',
      [id]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al editar colaboración' });
    }
  };

  const editColaborations = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    
    try {
      // Utiliza una consulta UPDATE para modificar la colaboración con el ID proporcionado
      const result = await client.query(
        'UPDATE colaboraciones SET description = $1, namecolaboration = $2, nameartist= $3 WHERE id_colab  = $4 RETURNING *',
        [updatedData.description , updatedData.namecolaboration, updatedData.nameartist, id]
      );

      // Comprueba si se actualizó correctamente y devuelve la fila actualizada
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Colaboración no encontrada' });
      }
    } catch (error) {
      console.error('Error al editar colaboración:', error.message);
      res.status(500).json({ error: 'Error al editar colaboración' });
    }
};

  
  module.exports = { createColaboration, getColaborations, editColaborations, deleteColaborations};
