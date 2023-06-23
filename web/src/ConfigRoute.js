import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import Cadastrar from './pages/cadastro';
import Detalhes from './pages/Detalhes';
import Carrinho from './pages/carrinho';

export default function ConfigRoute() {
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/logar' element={<Login/>}></Route>
            <Route path='/cadastrar' element={<Cadastrar/>}></Route>
            <Route path='/carrinho' element={<Carrinho/>}></Route>
            <Route path='/detalhes/:id' element={<Detalhes/>}></Route>
            <Route path='*' element={<h1 className="text-center text-danger mt-5">Pagina inexistente</h1>}></Route>
        </Routes>
    );
}