import React from "react";
import BtnBack from "./BtnBack.jsx";
import LinkAction from "./LinkAction.jsx";


function PostView({project}) {
    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha)
        return fechaFormateada.toLocaleDateString()
    }

    return (
        <section className="container">
            <div className="container px-0 card publicacionView mb-5">
                <div className="card-header">
                    {project.creador && <span>Publicado por: <strong>{project.creador.nombre}</strong></span> }
                    {project.categoria && <p className="badge bg-secondary float-end mb-0"> {project.categoria.nombre}</p>}
                </div>
                <div className="card-body">
                    <h1 className="text-center my-3">{project.titulo}</h1>
                    <p className="px-5 card-text descripcion">{project.descripcion}</p>
                    {project.image && <img className="card-img" src={`data:image/png;base64,${project.image}`} alt={project.titulo} />}

                </div>  
                <div className="card-footer">
                    Publicado <strong>{formatearFecha(project.createdAt)}</strong>
                </div>




                
            </div>
            <div className="d-flex justify-content-between">
                <BtnBack />
                {project.creador && <LinkAction to={`/chat/${project.creador._id}`} buttonText={"Enviar mensaje"}  />}
            </div>
            
        </section>
    );
}

export default PostView;
