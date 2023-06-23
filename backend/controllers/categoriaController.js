const categoriaModel = require('../models/categoriaModel');

class CategoriaController {
    async salvar(req, res) {
        const categoria = req.body;
        if (!categoria.nome ||!categoria.descricao) {
            res.status(400).json({ 'mensagem': 'Campos em branco' });
            return;
        }
        const max = await categoriaModel.find({}).sort({ codigo: -1 });
        categoria.codigo = max == null ? 1 : max.codigo + 1;
        await categoriaModel.create(categoria);
        res.status(201).json({ 'mensagem': 'sucesso' });
    }

    async listar(req, res) {
        const resultado = await categoriaModel.find({});
        if (resultado.length === 0) {
            res.status(200).json({ 'mensagem': 'vazio' });
            return;
        }
        res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        if (codigo && (codigo <= 0 || /^[0-9]+$/.test(codigo) === false)) {
            res.status(400).json({ 'mensagem': 'inválido' });
            return;
        }
        const resultado = await categoriaModel.findOne({ 'codigo': codigo });
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json({ 'mensagem': 'Nada encontrado' });
        }
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        if (!codigo) {
            res.status(400).json({ 'mensagem': 'Informe um codigo' });
            return;
        } else {
            if (codigo <= 0 || /^[0-9]+$/.test(codigo) === false) {
                res.status(400).json({ 'mensagem': 'Código inválido' });
                return;
            }
        }
        const categoria = req.body;
        if (!categoria.nome ||!categoria.descricao) {
            res.status(400).json({ 'mensagem': 'Campos em branco ' });
            return;
        }
        try {
            const _id = String((await categoriaModel.findOne({ 'codigo': codigo }))._id);
            await categoriaModel.findByIdAndUpdate(String(_id), categoria);
            res.status(200).json({ 'mensagem': 'sucesso' });
        } catch (err) {
            res.status(400).json({ 'mensagem': 'erro' });
        }
    }
}

module.exports = new CategoriaController();