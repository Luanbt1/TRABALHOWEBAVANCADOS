import Menu from '../components/Menu/index';
import Form from '../components/Form/index';

export default function login(){
    return(
        <>
            <Menu menu='login-cadastro'/>
            <Form tipo='login'/>
        </>
    );
}