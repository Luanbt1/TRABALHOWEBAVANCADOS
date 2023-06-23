const mongoose = require('mongoose');

const subSchemaProdutos = new mongoose.Schema({
    "produto": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produtos',
        required: true
    },
    "quantidade": {
        type: Number,
        required: true
    },
}, { _id : false });

const pedidoSchema = new mongoose.Schema({
    codigo: Number,
    custo: {
        type: Number,
        required: true
    },
    produtos: [subSchemaProdutos],
cliente: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes',
            required: true
},
data: {
    type: Date,
        required: false
},
status: {
    type: String,
        required: false
}
});

module.exports = mongoose.model('pedidos', pedidoSchema);