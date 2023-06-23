const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');

class ProdutoController {
    async salvar(req, res) {
        let pedido = req.body;
        if (!pedido.custo ||pedido.produtos.length === 0 ||!pedido.cliente) {
            res.status(400).json({ 'mensagem': 'Campos em branco' });
            return;
        }
        for (let i = 0; i < pedido.produtos.length; i++) {
            if (pedido.produtos[i].quantidade <= 0 || /^[0-9]+$/.test(pedido.produtos[i].quantidade) === false) {
                res.status(400).json({ 'mensagem': 'Informe uma quantidade valida' });
                return;
            }
        }
        const date = new Date();
        date.setHours(date.getHours() - 3);
        pedido.data = date;
        pedido.status = 'Aguardando Pagamento';
        const max = await pedidoModel.findOne({}).sort({ codigo: -1 });
        pedido.codigo = max == null ? 1 : max.codigo + 1;
        try {
            await pedidoModel.create(pedido);
            res.status(201).json({ 'mensagem': 'sucesso!' });
        } catch (err) {
            if (err.name === "ValidationError") {
                res.status(409).json({ 'mensagem': 'invalido' });
                return;
            }
            res.status(409).json({ 'mensagem': 'Erro desconhecido!', 'error': err });
        }

    }

    async listar(req, res) {
        const resultado = await pedidoModel.find({});
        if (resultado.length === 0) {
            res.status(200).json({ 'mensagem': 'nada encontrado' });
            return;
        }
        res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        if (codigo && (codigo <= 0 || /^[0-9]+$/.test(codigo) === false)) {
            res.status(400).json({ 'mensagem': 'Código inválido' });
            return;
        }
        const resultado = await pedidoModel.findOne({ 'codigo': codigo });
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(400).json({ 'mensagem': 'nada encontrado' });
        }
    }

    async Pedido(req, res) {
        const codigo = req.params.codigo;
        const codigoCliente = req.params.cliente;
        const acao = req.params.acao;
        if (acao === 'unico') {
            if (codigo && (codigo <= 0 || /^[0-9]+$/.test(codigo) === false)) {
                res.status(400).json({ 'mensagem': 'Código inválido' });
                console.log("a");
                return;
            }
            if (codigoCliente && (codigoCliente <= 0 || /^[0-9]+$/.test(codigoCliente) === false)) {
                res.status(400).json({ 'mensagem': 'Pedido inválido' });
                return;
            }
            const cliente = await clienteModel.findOne({ 'codigo': codigoCliente });
            const resultado = await pedidoModel.findOne({ 'cliente': cliente._id, 'codigo': codigo });
            if (resultado) {
                res.status(200).json(resultado);
                return;
            } else {
                res.status(400).json({ 'mensagem': 'Não encontrado' });
                return;
            }
        } else if (acao === 'todos') {
            if (codigoCliente && (codigoCliente <= 0 || /^[0-9]+$/.test(codigoCliente) === false)) {
                res.status(400).json({ 'mensagem': 'Pedido inválido' });
                return;
            }
            const cliente = await clienteModel.findOne({ 'codigo': codigoCliente });
            const resultado = await pedidoModel.find({ 'cliente': cliente._id });
            if (resultado) {
                res.status(200).json(resultado);
                return;
            } else {
                res.status(400).json({ 'mensagem': 'Não encontrado' });
                return;
            }
        } else {
            res.status(400).json({ 'mensagem': 'Ação inválida!' });
            return;
        }

    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const acao = req.params.acao;
        if (!codigo) {
            res.status(400).json({ 'mensagem': 'É obrigatório informar um código de pedido!' });
            return;
        } else {
            if (codigo <= 0 || /^[0-9]+$/.test(codigo) === false) {
                res.status(400).json({ 'mensagem': 'Código inválido' });
                return;
            }
        }
        const pedido = req.body;
        if (acao === 'produtos') {
            if (pedido.produtos.length === 0) {
                res.status(400).json({ 'mensagem': 'Ao menos um produto deve ser informado!' });
                return;
            }
            if (pedido.custo <= 0 || /^([0-9]*\.)?[0-9]+$/.test(pedido.custo) === false) {
                res.status(400).json({ 'mensagem': 'O custo total do(s) produto(s) deve(m) ser informado(s)!' });
                return;
            }
            for (let i = 0; i < pedido.produtos.length; i++) {
                if (pedido.produtos[i].quantidade <= 0 || /^[0-9]+$/.test(pedido.produtos[i].quantidade) === false) {
                    res.status(400).json({ 'mensagem': 'Deve ser informada um quantidade válida para o produto!' });
                    return;
                }
            }
            const consulta = await pedidoModel.findOne({ 'codigo': codigo });
            if (consulta) {
                if (consulta.status !== 'Aguardando Pagamento') {
                    res.status(400).json({ 'mensagem': 'Este pedido não pode ser alterado!' });
                    return;
                }
            }
        } else if (acao === 'status') {
            if (!pedido.status) {
                res.status(400).json({ 'mensagem': 'É obrigatório informar um Status!' });
                return;
            } else {
                const statusPedido = ['Faturado', 'Enviado', 'Cancelado'];
                if (statusPedido.includes(pedido.status) === false) {
                    res.status(400).json({ 'mensagem': 'Status inválido!' });
                    return;
                }
            }
        } else {
            res.status(400).json({ 'mensagem': 'Ação inválida!' });
            return;
        }
        try {
            const _id = String((await pedidoModel.findOne({ 'codigo': codigo }))._id);
            await pedidoModel.findByIdAndUpdate(String(_id), pedido);
            res.status(200).json({ 'mensagem': 'Pedido atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ 'mensagem': 'Pedido não encontrado!' });
        }
    }
}

module.exports = new ProdutoController();