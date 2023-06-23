const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

router.use(auth.autorizar);

router.get('/', pedidoController.listar);
router.post('/', pedidoController.salvar);
router.get('/:codigo', pedidoController.buscarPorId);
router.get('/:codigo/:cliente/:acao', pedidoController.Pedido);
router.put('/:codigo/:acao', pedidoController.atualizar);

module.exports = router;

