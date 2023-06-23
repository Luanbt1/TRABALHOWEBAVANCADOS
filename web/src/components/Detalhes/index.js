import { useState } from 'react';
import './detalhes.css';

export default function Detalhes({ dados }) {



    let produto = (
        [
            {
                codigo: dados._id,
                nome: dados.nome,
                preco: dados.preco,
                imagem: dados.imagem,
                descricao: dados.descricao,
                quantidade: 1
            }
        ]
    );

    function handleClick() {
        let data = localStorage.getItem("carrinho");
        if (data) { 
            let storedCarrinho = JSON.parse(data);
            if(storedCarrinho.find(item => item.codigo == dados._id)){
                storedCarrinho.forEach(prod => {
                  if(prod.codigo == dados._id){
                    prod.quantidade++;
                  }  
                });
            }else{
                storedCarrinho.push(
                    {
                        codigo: dados._id,
                        nome: dados.nome,
                        preco: dados.preco,
                        imagem: dados.imagem,
                        descricao: dados.descricao,
                        quantidade: 1
                    }
                );
            }
            localStorage.setItem("carrinho", JSON.stringify(storedCarrinho));

        } else {
            localStorage.setItem("carrinho", JSON.stringify(produto));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 text-center">
                    <img src={dados.imagem} className="img-fluid rounded shadow" alt={dados.nome}></img>
                </div>
                <div className="col-8 text-center">
                    <p>{dados.nome}</p>
                    <p>Categoria: {dados.categoria.nome}</p>
                    <p>Nota: {dados.nota}</p>
                    <p>Preco: R$ {dados.preco}</p>
                    <h6>Descrição:</h6>
                    <p className='sinopse m-auto mb-4'>{dados.descricao}</p>
                    <button className="btn active" onClick={handleClick}>Comprar</button>
                </div>
            </div>
        </div>
    );

}