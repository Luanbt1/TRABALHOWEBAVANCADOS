import Footer from '../components/Footer';
import Form from '../components/Form/index';
import Menu from '../components/Menu/index';
import Titulo from '../components/Titulo/index';

export default function cadsatro(){
    return(
        <>
            <Menu menu='login-cadastro' />
            <Titulo title='Cadastro'/>
            <div className='pb-5'>
                <Form tipo='cadastro'/>
            </div>
        </>
    );
}