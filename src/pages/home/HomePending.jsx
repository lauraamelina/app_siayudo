import React, {useEffect, useContext} from "react";
import * as authService from "../../services/auth.services.js";
import {useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import duda from '../../assets/img/duda_fundacion.jpeg';

function HomeFundaciones() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
        if(user.type !== 3){
            navigate(-1)
        }

    }, [])

    function logout() {
      authService.logout()
      navigate('/login')
    }
  

    return (
      <div className="homeD">
        <h1 className="visually-hidden">Si ayudo - Página Principal Fundaciones Pendientes de aprobación</h1>

        <section className="banner container mb-5">
          <div className="row align-items-center">
              <div className="col-md-7">
                  <h2>Bienvenido, <strong> {user.name} </strong></h2>
                  <div className="text-left mt-4">
                    <p> Todavía no hemos verificado tu identidad.</p>
                    <p> Cuando lo hagamos, te notificaremos por mail para que puedas ingresar a tu cuenta de <span className="celeste fw-bold">Siayudo</span></p>

                    <Link className="btn boton-fundacion" to={"/login"} onClick={logout}>Cerrar sesión</Link>
                  </div>
              </div>
              <div className="col-md-5 text-center">
                  <img src={duda} alt="Ilustración de una persona haciendose una pregunta" className="rounded-circle" />
              </div>
          </div>
        </section>

      </div>
    )
}
export default HomeFundaciones;