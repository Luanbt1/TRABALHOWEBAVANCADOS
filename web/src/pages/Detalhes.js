import { useState, useEffect } from 'react';
import Comentarios from '../components/Comentarios';
import Detalhes from '../components/Detalhes/index';
import Menu from '../components/Menu/index';
import Titulo from '../components/Titulo';
import { useParams } from 'react-router-dom';


export default function DetalhesP() {

    const { id } = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/produto/' + id)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }, []);
    
    return (
        <>
            <Menu menu='home-produto' />
            <Titulo tipo='detalhes' title={data.nome} />
            <div className="Detalhes mt-5 pb-5">
                {(() => {
                    if (!data) {
                        return (
                            <div className="text-center m-auto col-12">
                                <h4>Carregando...</h4>
                            </div>
                        );
                    } else if (data.codigo == null) {
                        return (
                            <div className="text-center m-auto col-12">
                                <h4>Produto indisponivel</h4>
                            </div>
                        );
                    } else {
                        return (
                            <>
                                <Detalhes dados={data} />
                                <Comentarios dados={data.comentarios} />
                            </>
                        );
                    }
                })()}
            </div>
        </>
    );
}