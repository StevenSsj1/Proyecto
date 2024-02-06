const express = require('express');
const bodyParser = require('body-parser');
const { createUser, authUsuario } = require('./controllers/userController');
const { createColaboration, getColaborations, editColaborations, deleteColaborations } = require('./controllers/colaborationController');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());
app.use(cors());

// Ruta para crear un nuevo usuario
app.post('/users', createUser);
app.post('/auth', authUsuario);
app.post('/colab', createColaboration);
app.get('/colab', getColaborations);
app.put('/colab/:id', editColaborations);
app.delete('/colab/:id', deleteColaborations);


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
