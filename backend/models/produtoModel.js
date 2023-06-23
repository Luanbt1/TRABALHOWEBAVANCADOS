const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    codigo: Number,
    nome: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: false
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    },
    animal: {
        type: String,
        required: true
    },
    comentarios: {
        type: Array,
        required: false
    },
    nota: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('produtos', produtoSchema);