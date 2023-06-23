import './comentarios.css';

export default function Comentarios({dados}) {

    return (
        <div className="container">
            <div className="row">
                <div className='col-12 text-center mb-3'>
                    <hr></hr>
                    <h4>Comentarios:</h4>
                </div>
                {dados.map((coment) => (
                    <div className='row my-2'>
                        <div className="col-2">
                            <img className='foto rounded-circle' src={coment.avatar} ></img>
                        </div>
                        <div className="col-7">
                            <h6>{coment.nome}</h6>
                            <p>{coment.descricao}</p>
                        </div>
                        <div className="col-3 text-center">
                            <h6>Nota: {coment.nota}y</h6>
                        </div>
                        <div className='mt-1'><hr></hr></div>
                    </div>
                ))}
            </div>
        </div>
    );
}