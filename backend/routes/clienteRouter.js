const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.salvar);
router.get('/:codigo', clienteController.buscarPorId);
router.put('/:codigo/:acao', clienteController.atualizar);

module.exports = router;

