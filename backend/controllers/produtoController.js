const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');

class ProdutoController {
    async salvar(req, res) {
        const produto = req.body;
        // if (!produto.nome ||!produto.imagem ||!produto.descricao ||!produto.preco ||!produto.categoria ||!produto.animal) {
        //     res.status(400).json({ 'msg': 'Todos os campos são obrigatórios' });
        //     return;
        // }
        const max = await produtoModel.findOne({}).sort({ codigo: -1 });
        produto.codigo = max == null ? 1 : max.codigo + 1;
        try {
            await produtoModel.create(produto);
            res.status(201).json({ 'msg': 'Produto cadastrado com sucesso!' });
        } catch (err) {
            if (err.name === "ValidationError") {
                res.status(409).json({ 'msg': 'Categoria invalida!' });
                return;
            }
            res.status(409).json({ 'msg': 'Erro desconhecido!', 'error': err });
        }
    }

    async listar(req, res) {
        const produtos = await produtoModel.aggregate([{
            $lookup: {
                from: 'categorias',
                localField: 'categoria',
                foreignField: '_id',
                as: 'categoria'
            }
        }]);
        if (produtos.length === 0) {
            res.status(200).json({ 'msg': 'Nenhum produto foi encontrado!' });
            return;
        }
        let resultado = [];
        const categoria = await categoriaModel.find({});
        for (let i = 0; i < categoria.length; i++) {
            let temp = {}
            temp.categoria = categoria[i].nome;
            temp.produtos = [];
            resultado.push(temp);
        }
        for (let i = 0; i < produtos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (produtos[i].categoria[0].nome === resultado[j].categoria) {
                    resultado[j].produtos.push(produtos[i]);
                }
            }
        }
        res.status(200).json(resultado);
    }

    async localizar(req, res) {
        const codigo = req.params.codigo;
        if (codigo && (codigo <= 0 || /^[0-9]+$/.test(codigo) === false)) {
            res.status(400).json({ 'msg': 'Código inválido' });
            return;
        }
        const resultado = await produtoModel.findOne({ 'codigo': codigo });
        if (resultado) {
            const categoria = await categoriaModel.findOne({ '_id': resultado.categoria });
            resultado.categoria = categoria;
            res.status(200).json(resultado);
        } else {
            res.status(400).json({ 'msg': 'Produto não encontrado!' });
        }
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        if (!codigo) {
            res.status(400).json({ 'msg': 'É obrigatório informar um código de produto!' });
            return;
        } else {
            if (codigo <= 0 || /^[0-9]+$/.test(codigo) === false) {
                res.status(400).json({ 'msg': 'Código inválido' });
                return;
            }
        }
        const produto = req.body;
        if (!produto.nome ||!produto.imagem ||!produto.descricao ||!produto.preco ||!produto.categoria ||!produto.animal) {
            res.status(400).json({ 'msg': 'Todos os campos são obrigatórios' });
            return;
        }
        try {
            const _id = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
            await produtoModel.findByIdAndUpdate(String(_id), produto);
            res.status(200).json({ 'msg': 'Produto atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ 'msg': 'Produto não encontrado!' });
        }
    }

    async comentario(req, res) {
        const codigo = req.params.codigo;
        if (!codigo) {
            res.status(400).json({ 'msg': 'É obrigatório informar um código de produto!' });
            return;
        } else {
            if (codigo <= 0 || /^[0-9]+$/.test(codigo) === false) {
                res.status(400).json({ 'msg': 'Código inválido' });
                return;
            }
        }
        let produto = req.body;
        if (!produto.comentarios.avatar ||!produto.comentarios.nome ||!produto.comentarios.descricao ||!produto.comentarios.nota) {
            res.status(400).json({ 'msg': 'Todos os campos são obrigatórios' });
            return;
        }
        if (produto.comentarios.nota < 0 || produto.comentarios.nota > 10 || /^[0-9]+$/.test(produto.comentarios.nota) === false) {
            res.status(400).json({ 'msg': 'Nota inválida' });
            return;
        }
        const _id = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
        const resultado = await produtoModel.findByIdAndUpdate(String(_id), {
            $push: {
                comentarios: {
                    avatar: produto.comentarios.avatar,
                    nome: produto.comentarios.nome,
                    descricao: produto.comentarios.descricao,
                    nota: produto.comentarios.nota
                }
            }
        });
        if (resultado) {
            const busca = await produtoModel.findOne({ 'codigo': codigo });
            let parcial = 0;
            let divisor = busca.comentarios.length;
            for (let i = 0; i < busca.comentarios.length; i++) {
                parcial += busca.comentarios[i].nota;
            }
            produto = new Object;
            produto.nota = Number(parseFloat(parcial / divisor).toFixed(2));
            const _id = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
            await produtoModel.findByIdAndUpdate(String(_id), produto);
            res.status(200).json({ 'msg': 'Comentário cadastrado com sucesso' });
            return;
        }
    }
}

module.exports = new ProdutoController();