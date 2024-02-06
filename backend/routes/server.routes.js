// routes/userRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const usuariosController = require('../controllers/usuariosController');

const router = express.Router();
router.use(bodyParser.json());

router.get('/usuarios', usuariosController.getUsuarios);
router.post('/usuarios', usuariosController.createUsuarios);
router.post('/auth', usuariosController.authUsuarios);
router.get('/usuarios/:id', usuariosController.getUsuarioById);
router.put('/usuarios/:id', usuariosController.editUsuario);
router.delete('/usuarios/:id', usuariosController.deleteUsuario);



module.exports = router;
