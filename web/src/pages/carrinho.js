import Menu from "../components/Menu";
import Titulo from "../components/Titulo";
import Card from "../components/Card";
import jwt from 'jwt-decode';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Carrinho() {

    const [endereco, setEndereco] = useState('');
    const [cartao, setCartao] = useState('');
    const [data, setData] = useState({});
    const storedToken = localStorage.getItem("token");

    const dataProd = localStorage.getItem("carrinho");
    let carrinho = [];

    let value = 0;
    if (dataProd) {
        carrinho = JSON.parse(dataProd);
        carrinho.forEach(prod => {
            value += prod.preco * prod.quantidade;
        });
    }

    useEffect(() => {
        if (storedToken) {
            setData(jwt(storedToken));
        }
        setEndereco(data.endereco);
        setCartao(data.cartao);
    }, [endereco, cartao])

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (storedToken) {
            try {
                const data = jwt(storedToken)
                if (dataProd) {
                    const listaProdutos = JSON.parse(dataProd);
                    let bodyParam = {
                        custo: value.toFixed(2),
                        produtos: [],
                        cliente: data._id
                    }
                    listaProdutos.forEach(prod => { 
                        bodyParam.produtos.push({
                            produto:prod.codigo,
                            quantidade:prod.quantidade
                        });
                    });
                    api.post('/pedido', bodyParam, {headers: {Authorization: 'Bearer '+storedToken}})
                        .then((response) => {
                            alert(response.data.msg)
                        })
                        .catch((err) => {
                            console.error(err)
                            alert(" Ocorreu um erro! Veja no console ..")
                        })
                    alert("Compra efetuada")
                } else {
                    alert("Carrinho vazio")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Por favor fazer o login!')
            navigate("/logar");
        }
    }

    function handleClick() {
        localStorage.removeItem("carrinho");
        navigate("/carrinho");
    }

    return (
        <>
            <Menu menu='checkout' />
            <Titulo title='Carrinho' />
            <div className="container pb-5">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <p>Produtos selecionados:</p>
                        {carrinho.map((produto) => (
                            <Card dados={produto} tipo="checkout" />
                        ))}
                        <div className="text-center">
                            <p>Total: R$ {value.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-10">
                        <p>Cartao para compra:</p>
                        <p className="text-muted">{cartao}</p>
                        <p>Endereço para entrega:</p>
                        <p className="text-muted">{endereco}</p>
                        {(() => {
                            if (dataProd) {
                                return (
                                    <div>
                                        <button className="btn btn-outline-danger" onClick={handleClick}>Esvaziar</button>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                    <div className="col-12"></div>
                    <div className="col-lg-4 col-12"></div>
                    <div className="col-lg-4 col-12 text-center">
                        <form onSubmit={handleSubmit}>
                            <button type='submit'>Efetuar compra</button>
                        </form>
                    </div>
                    <div className="col-lg-4 col-12"></div>
                </div>
            </div>
        </>
    );
}