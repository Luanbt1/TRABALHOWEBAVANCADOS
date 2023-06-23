import "./card.css";

export default function Card({ dados, tipo }) {
    if (tipo == "checkout") {
        return (
            <div className="container rounded bg-light shadow my-2 p-2">
                <div className="row">
                    <div className="col-3">
                        <img className="foto-prod rounded" src={dados.imagem}></img>
                    </div>
                    <div className="col-6">
                        <h6>{dados.nome}</h6>
                        <p>{dados.descricao}</p>
                    </div>
                    <div className="col-3">
                        <h6>Preco: R$ {dados.preco}</h6>
                        <p className="text-muted">Qtd: {dados.quantidade}</p>
                    </div>
                </div>
            </div>
        );
    }
    if(tipo == "home"){
        return(
            <div className="col-lg-4 col-md-6">
                <div className="my-3 mx-1 p-2 text-center rounded shadow card-altura">
                    <img className="foto-home rounded" src={dados.imagem}></img>
                    <hr></hr>
                    <div className="overflow-hidden desc-altura">
                        <h6>{dados.nome}</h6>
                        <p>{dados.descricao}</p>
                    </div>
                    <h6>R$ {dados.preco}</h6>
                    <a href={"/detalhes/" + dados.codigo} className="btn btn-outline-primary">Mostrar detalhes</a>
                </div>
            </div>
        );
    }
    
}