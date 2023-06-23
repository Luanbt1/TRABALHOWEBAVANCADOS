const clienteModel = require('../models/clienteModel');
const auth = require('./../auth/auth');
const bcryptjs = require('bcryptjs');

class ClienteController {
    async salvar(req, res) {
        const cliente = req.body;
        if (!cliente.foto ||!cliente.nome ||!cliente.endereco ||!cliente.telefone ||!cliente.cpf ||!cliente.cartao.nome ||!cliente.cartao.numero ||!cliente.cartao.cvc ||!cliente.email ||!cliente.senha) {
            res.status(400).json({ 'mensagem': 'Campos em branco' });
            return;
        }
        const max = await clienteModel.findOne({}).sort({ codigo: -1 });
        cliente.codigo = max == null ? 1 : max.codigo + 1;
        try {
            const resultado = await clienteModel.create(cliente);
            auth.incluirToken(resultado);
            res.status(201).json({ 'mensagem': 'sucesso' });
        } catch (err) {
            if (err.code === 11000) {
                if (err.keyPattern.cpf && err.keyPattern.cpf === 1) {
                    res.status(409).json({ 'mensagem': 'cpf ja utilizado' });
                    return;
                }
                if (err.keyPattern.email && err.keyPattern.email === 1) {
                    res.status(409).json({ 'mensagem': 'e-mail ja registrado' });
                    return;
                }
            }
            res.status(409).json({ 'mensagem': 'Erro desconhecido!', 'err': err });
        }
    }

    async listar(req, res) {
        const resultado = await clienteModel.find({});
        if (resultado.length === 0) {
            res.status(200).json({ 'mensagem': 'nada encontrado' });
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
        const resultado = await clienteModel.findOne({ 'codigo': codigo });
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json({ 'mensagem': 'Cliente não encontrado!' });
        }
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const acao = req.params.acao;
        if (!codigo) {
            res.status(400).json({ 'mensagem': 'É obrigatório informar um código de cliente!' });
            return;
        } else {
        }
        let cliente = req.body;
        if (acao === 'cadastro') {
            if (!cliente.foto ||!cliente.nome ||!cliente.endereco ||!cliente.telefone) {
                res.status(400).json({ 'mensagem': 'Campos em branco' });
                return;
            }
        } else if (acao === 'cartao') {
            if (!cliente.cartao.nome ||!cliente.cartao.numero ||!cliente.cartao.cvc) {
                res.status(400).json({ 'mensagem': 'Campos em branco' });
                return;
            }
        } else if (acao === 'senha') {
            if (!cliente.senha) {
                res.status(400).json({ 'mensagem': 'É obrigatório informar uma senha válida' });
                return;
            }
            const hash = await bcryptjs.hash(cliente.senha, 10);
            cliente.senha = hash;
        } else {
            res.status(400).json({ 'mensagem': 'Ação inválida!' });
            return;
        }
        try {
            const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);
            await clienteModel.findByIdAndUpdate(String(_id), cliente);
            res.status(200).json({ 'mensagem': mensagem });
        } catch (err) {
            res.status(400).json({ 'mensagem': 'Cliente não encontrado!' });
        }
    }
}

module.exports = new ClienteController();