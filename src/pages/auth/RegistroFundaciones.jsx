import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../services/auth.services.js'
import swal from 'sweetalert';

function RegistroFundaciones() {
    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [cuit, setCuit] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [localidad, setLocalidad] = useState("")
    const [archivo, setArchivo] = useState('')

    const switchShowPassword = () =>{
        setShowPassword(!showPassword);
    }

    const handleArchivo = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        //reduce el tamaño de la imagen a 1MB
        reader.onload = () => {
            if(reader.result.split(",")[1].length > 100000 ){ 
                setError("Tamaño de archivo muy grande")
                e.target.value = null
            } else {
                setError("")
                setArchivo(reader.result.split(",")[1]);
            }

        }

    }

    const handleCuit = (e) => {
        setCuit(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()        
        const user = {
            name: name,
            email: email,
            password: password,
            cuit: cuit,
            type: 3,
            telefono: telefono,
            direccion: direccion,
            localidad: localidad,
            image: archivo
        }

        authService.registro(user)
            .then(() => {
                swal("Registro realizado con éxito", "Tu cuenta está pendiente hasta que sea verificada.", "success");
                navigate("/login")
            })
        .catch(err=>setError(err.message))
    }

    return (
        <section className="registro-fundaciones">
            <h1>Registro Fundaciones</h1>
            {error !== "" && 
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
            }
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="" className="form-label"> Nombre de la ONG</label>
                    <input className="form-control" type="text" id="" value={name} onChange={e=> setName(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input className="form-control" type="text" id="" value={email} onChange={e=> setEmail(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">CUIT</label>
                    <input className="form-control" type="number" id="" value={cuit} maxLength={13} onChange={handleCuit} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input className="form-control" type="number" id="telefono" value={telefono} onChange={e=> setTelefono(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input className="form-control" type="text" id="direccion" value={direccion} onChange={e=> setDireccion(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="localidad" className="form-label">Localidad</label>
                    <input className="form-control" type="text" id="localidad" value={localidad} onChange={e=> setLocalidad(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="archivo" className="form-label">Inscripción en IGJ</label>
                    <input className="form-control" type="file" id="archivo" accept=".png, .jpg, .jpeg" filename={archivo} onChange={handleArchivo} required />
                </div>


                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> Contraseña</label>
                    <input className="form-control" type={showPassword ? "text": "password"}  id="password" value={password} onChange={e=> setPassword(e.target.value)} required/>
                </div>

                <div className="form-check">
                    <input type="checkbox" name="showpassword" id="showpassword" className="form-check-input" onChange={switchShowPassword}/>
                    <label htmlFor="showpassword" className="form-check-label"> Mostrar contraseña</label>
                </div>


                <div className="botones-registro">
                    <button className="btn btn-primary" type="submit">Registro</button>
                    <Link className="btn btn-primary" to={'/login'}>¿Ya tenés una cuenta? Iniciá sesión</Link>
                </div>
        
            </form>
          
        </section>
    )
}
export default RegistroFundaciones;