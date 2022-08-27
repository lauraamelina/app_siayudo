import React, {useEffect, useState, useContext} from "react";
import * as authService from "../../services/auth.services.js";
import * as adminService from "../../services/admin.services";
import {useNavigate, Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx';

import duda from '../../assets/img/duda_fundacion.jpeg';

function HomeRechazado() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const [cuit, setCuit] = useState("");
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [localidad, setLocalidad] = useState("")
    const [archivo, setArchivo] = useState('')
    const [motivo, setMotivo] = useState("")
    

    
    useEffect(()=>{
        if(user.type !== 4){
            navigate(-1)
        }
        adminService.findMotivo(user._id) 
            .then((motivo) => {
                setMotivo(motivo)
            })
    }, [])

    function logout() {
      authService.logout()
      navigate('/login')
    }

    const handleArchivo = (e) => {
        setArchivo(e.target.files[0])
    }

    const switchShowForm = () =>{
        setShowForm(!showForm);
    }

    function handleSubmit(e) {
        e.preventDefault()
        const userUpdate = {
            _id: user._id,
            email: user.email,
            name: user.name,
            cuit: cuit,
            telefono: telefono,
            direccion: direccion,
            localidad: localidad,
            type: 3,
            image: archivo,
        }
        
        adminService.updateUser(userUpdate)
        .then(() => {
            const userLS = {
                _id: user._id,
                email: user.email,
                name: user.name,
                type: 3,
            }
            authService.setUser(userLS)
            navigate('/home/pending', {replace: true})
        
        })
        .catch(err => {
            console.log(err)
        }
        )
    }



    return (
      <div className="homeD ">
        <h1 className="visually-hidden">Si ayudo - Página Principal Fundaciones no aprobadas</h1>

        <section className="banner container mx-auto mb-5">
              <div>
                  <h2>Bienvenido, <strong> {user.name} </strong></h2>
                  <div className="text-left mt-4">
                    <p>Hemos verificado tu documentación y hemos notado que <span className="text-danger">no cumpes con los requisitos</span>  para tener una cuenta como fundación en SiAyudo</p>
                    {
                        motivo && <p>Motivo del rechazo: <span className="fw-bold text-danger">{motivo}</span></p>
                    }
                    <div className="d-flex container">
                        <Link className="btn btn-secondary me-auto" to={"/login"} onClick={logout}>Cerrar sesión</Link>
                        <button className="btn boton-fundacion ms-auto" onClick={switchShowForm}>Quiero volver a intentar</button>
                    </div>

                    {showForm && 
                        <form className="form-group my-4" onSubmit={handleSubmit}>
                        
                            <div className="mb-3">
                                <label htmlFor="cuit" className="form-label">CUIT</label>
                                <input className="form-control" type="number" id="cuit" value={cuit} onChange={e=> setCuit(e.target.value)} required />
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
                                <label htmlFor="archivo" className="form-label">Inscripción en IGJ (formato PDF)</label>
                                <input className="form-control" type="file" id="archivo" accept=".png, .jpg, .jpeg" filename={archivo} onChange={handleArchivo} required />
                            </div>
                            <div className="d-flex">
                                <button className="btn boton-fundacion ms-auto" type="submit">Enviar</button>
                            </div>
                        </form>
                    }

                    {!showForm && 
                        <div className="text-center">
                            <img src={duda} alt="Ilustración de una persona haciendose una pregunta" className="rounded-circle" />
                        </div>
                    }

                  </div>
              </div>
         
        </section>

      </div>
    )
}
export default HomeRechazado;