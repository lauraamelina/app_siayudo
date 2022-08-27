import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../services/auth.services.js'
import swal from 'sweetalert';

function RegistroDonantes() {
    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const switchShowPassword = () =>{
        setShowPassword(!showPassword);
    }


    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password,
            type: 1,
        }
        authService.registro(user)
            .then(()=> {
                swal("Registro realizado con éxito", "", "success");
                navigate('/login', {replace: true})
            
            })
            .catch(err=>setError(err.message))

    }

    return (
        <section className="registro-donantes">
            <h1>Registro Donantes</h1>
            <div className="error"> {error && <p>{error}</p>}</div>

            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"> Nombre y apellido</label>
                    <input className="form-control" type="text" id="name" value={name} onChange={e=> setName(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" type="text" id="email" value={email} onChange={e=> setEmail(e.target.value)} required/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> Contraseña</label>
                    <input className="form-control" type={showPassword ? "text": "password"} id="password" value={password} onChange={e=> setPassword(e.target.value)} required/>
                </div>

                <div className="form-check">
                    <input type="checkbox" name="showpassword" id="showpassword" className="form-check-input" onChange={switchShowPassword}/>
                    <label htmlFor="showpassword" className="form-check-label"> Mostrar contraseña</label>
                </div>

                
                <div className="botones-registro-d">
                    <button className="btn btn-primary" type="submit">Registro</button>
                    <Link className="btn btn-primary" to={'/login'}>¿Ya tenés una cuenta? Iniciá sesión</Link>
                </div>
        
            </form>
        </section>
    )
}
export default RegistroDonantes;