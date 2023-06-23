require("./mongodb");
const mongoose = require("mongoose");
const categoriaModel = require('../models/categoriaModel');
const produtoModel = require('../models/produtoModel');
const categorias = require('./categorias.json');
const produtos = require('./produtos.json');

async function importData() {
    try {
        await categoriaModel.deleteMany({});
        for (const categoria of categorias) {
            await categoriaModel.create(categoria);
        }
        console.log('Carga de categorias efetuada com sucesso!');

        await produtoModel.deleteMany({});
        for (const produto of produtos) {
            await produtoModel.create(produto);
        }
        console.log('Carga de produtos efetuada com sucesso!');
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
};

importData();

//node .\database\import.js