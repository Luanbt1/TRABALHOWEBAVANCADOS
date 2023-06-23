const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listar);
router.post('/', produtoController.salvar);
router.get('/:codigo', produtoController.localizar);
router.put('/:codigo', produtoController.atualizar);
router.put('/:codigo/comentario', produtoController.comentario);

module.exports = router;
