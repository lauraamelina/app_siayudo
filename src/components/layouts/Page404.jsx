import React from "react";
import LinkAction from "../posts/LinkAction";

function Page404() {
    return (
        <div className="container not-found">
            <h1 className="visually-hidden">Error 404 - Página no encontrada</h1>
            <p className="h3 mb-5">OOPS! Página no encontrada</p>
            <LinkAction to={'/'} buttonText={'Volver al inicio'}/>
        </div>
    );
    }

export default Page404;