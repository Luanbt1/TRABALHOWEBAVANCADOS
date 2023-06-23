const clienteModel = require('./../models/clienteModel');
const auth = require('./../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {
    async login(req, res) {
        const clientePost = req.body;
        if (
            !clientePost.email ||
            !clientePost.senha
        ) {
            res.status(400).send({ 'mensagem': 'Campos em branco' });
            return;
        }
        const cliente = await clienteModel.findOne({ 'email': clientePost.email }).select('+senha');
        if (!cliente) {
            res.status(400).send({ 'mensagem': 'Usuário não encontrado!' });
            return;
        }
        if (!await bcryptjs.compare(clientePost.senha, cliente.senha)) {
            res.status(400).send({ 'mensagem': 'Senha inválida!' });
            return;
        }
        await auth.incluirToken(cliente);
        res.status(200).json({ nome: cliente.nome, token: cliente.token });
    }
}

module.exports = new LoginController();