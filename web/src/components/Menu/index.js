import './menu.css';
import { Link } from 'react-router-dom';



export default function Menu({ menu }) {
    return (
        <nav className="navbar navbar-expand-lg bg-light shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuHam" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end text-center" id="menuHam">
                    <ul className="navbar-nav">
                        {(() => {
                            if (menu == "home-produto") {
                                return (
                                    <>
                                        <li className="nav-item"><Link to='/cadastrar' className="nav-link">Cadastrar</Link></li>
                                        <li className="nav-item"><Link to='/carrinho' className="nav-link">Carrinho</Link></li>
                                        <li className="nav-item"><Link to='/logar' className="nav-link">Logar</Link></li>
                                    </>
                                );
                            }
                            if (menu == "login-cadastro") {
                                return (

                                    <>
                                    <li className="nav-item"><Link to='/cadastrar' className="nav-link">Cadastrar</Link></li>
                                        <li className="nav-item"><Link to='/carrinho' className="nav-link">Carrinho</Link></li>
                                        <li className="nav-item"><Link to='/logar' className="nav-link">Logar</Link></li>
                                        <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
                                    </>

                                );
                            }
                            if (menu == "checkout") {
                                return (
                                    <>
                                        <li className="nav-item"><Link to='/logar' className="nav-link">Logar</Link></li>
                                        <li className="nav-item"><Link to='/cadastrar' className="nav-link">Cadastrar</Link></li>
                                        <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
                                    </>
                                );
                            }
                        })()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}