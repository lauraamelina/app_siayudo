import React, {useContext} from 'react'
import * as authService from '../../services/auth.services.js'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx' 



function Header() {
    const {user} = useContext(AuthContext)
    let navigate = useNavigate()
    
    function logout() {
        authService.logout()
        navigate('/login')
    }



    if(user === null){
        return(
        <header>
            <p id="logo">Siayudo</p>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">
                            {/* <li className="nav-item"><Link className="nav-link" to={"/"}>Home</Link></li> */}
                            <li className="nav-item"><Link className="nav-link" to={"/login"}>Ingresá</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/registro"}>Registrate</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        )
    } else if (user.type === 1) {
        return(
            <header>
                <p id="logo">Siayudo</p>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto ">
                                <li className="nav-item"><Link className="nav-link" to={"/home/donantes"}>Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"/posts/list"}>Campañas</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"/posts/nuevo"}>Publicar</Link></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">{user.name}</a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to={"/perfil"}>Mi perfil</Link></li>
                                        <li><Link className="dropdown-item" to={"/posts"}>Mis donaciones</Link></li>
                                        <li><Link className="dropdown-item" to={"/chat/messages"}>Mensajes</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><Link className="dropdown-item" to={"/login"} onClick={logout}>Cerrar sesión</Link></li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    } else if (user.type === 2) {
        return(
            <header>
                <p id="logo">Siayudo</p>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto ">
                                <li className="nav-item"><Link className="nav-link" to={"/home/fundaciones"}>Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"/posts/list"}>Donaciones</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"/posts/nuevo"}>Publicar</Link></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">{user.name}</a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to={"/perfil"}>Mi perfil</Link></li>
                                        <li><Link className="dropdown-item" to={"/posts"}>Mis campañas</Link></li>
                                        <li><Link className="dropdown-item" to={"/chat/messages"}>Mensajes</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><Link className="dropdown-item" to={"/login"} onClick={logout}>Cerrar sesión</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    } else if (user.type === 0) {
        return (
            <header>
                <p id="logo">Siayudo</p>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto ">
                                <li className="nav-item"><Link className="nav-link" to={"/home/admin"}>Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to={"/admin/usuarios"}>Usuarios</Link></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">{user.name}</a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to={"/admin/perfil"}>Mi perfil</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><Link className="dropdown-item" to={"/login"} onClick={logout}>Cerrar sesión</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header


