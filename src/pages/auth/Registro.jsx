import React from "react";
import { Link } from "react-router-dom";


function Registro() {
    return (
      <div className="container-registro">
        <h1 className="visually-hidden">Si ayudo - Registro</h1>
        <section className="registro">
            <h2>¿Qué tipo de usuario sos?</h2>
            <Link className="btn btn-primary" to={"/registro/donantes"}>Soy donante</Link>
            <Link className="btn btn-primary" to={"/registro/fundaciones"}>Soy fundación/ONG</Link>
        </section>
      </div>
    )
}
export default Registro;