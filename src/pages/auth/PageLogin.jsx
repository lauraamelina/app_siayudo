import React, {useState} from "react";
import * as authService from '../../services/auth.services.js'
import { Link } from "react-router-dom";



function PageLogin({onLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        authService.login(email, password)
        .then(({user, token})=>onLogin(user, token))
        .catch(err=>setError(err.message))
    }

    return (
        <div className="container-fluid container-login">
            <section className="login">
                <h1>Iniciar Sesión</h1>
                {error !== "" && 
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    }
                <form onSubmit={handleSubmit} className="container">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-control" type="text" id="email" value={email} onChange={e=> setEmail(e.target.value)}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"> Contraseña</label>
                        <input className="form-control" type="password" id="password" value={password} onChange={e=> setPassword(e.target.value)}/>
                    </div>
                    <div className="botones-login text-center mt-0">
                        <Link className="btn-default fw-bold fs-6 mb-2" to={'/recuperacion'}> ¿Olvidaste tu contraseña?</Link>
                        <button className="btn btn-primary" type="submit">Ingresar</button>
                        <Link className="btn btn-primary" to={'/registro'}> ¿No tenés cuenta? Registrate</Link>
                    </div>
                </form>
            </section>
        </div>

    )
}

export default PageLogin