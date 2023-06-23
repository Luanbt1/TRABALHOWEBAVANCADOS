export default function Titulo({title, text, tipo}) {
    if(tipo == "detalhes"){
        return(
            <div className="Titulo mt-5">
                <div className="container text-center">
                    <h1>Informacoes do produto</h1>
                    <hr></hr>
                </div>
            </div>
        );
    }
    if(tipo == "categoria"){
        return(
            <div className="Titulo mt-2 col-12">
                <div className="container text-center p-1">
                    <h4>{title}</h4>
                    <hr></hr>
                </div>
            </div>
        );
    }else{
        return (
            <div className="Titulo mt-5">
                <div className="container text-center">
                    <h1>{title}</h1>
                    <p className="text-muted">{text}</p>
                    <hr></hr>
                </div>
            </div>
        );
    }
}