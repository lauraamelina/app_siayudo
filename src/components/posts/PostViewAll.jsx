import React from "react";
import { Link } from "react-router-dom";
import BtnBack from "./BtnBack";
import LinkAction from "./LinkAction";
import NameTitle from "./TitleName";

function PostViewAll({posts}) {
   
    const cortarTexto = (texto) => {
        if (texto.length > 100) {
            return texto.substring(0, 100) + '...'
        } else {
            return texto
        }
    }
    
  return(
    <div className="mb-4">
        {posts.length > 0 && posts.map((project, i) => 
                <div className="card postsList my-5" key={i}>
                    <div className="row g-0">
                        <div className="card-header col-12">
                            Publicado por: <strong className="link-user"><Link to={`/posts/user/${project.creador._id}`}>{project.creador.nombre}</Link></strong> 
                            <p className="badge bg-secondary float-end mb-0"> {project.categoria.nombre}</p>
                        </div>
                        <div className="col-sm-3">
                            { project.image && <img className="card-img-post mb-3 " src={`data:image/png;base64,${project.image}`} alt={project.titulo} />}
                        </div>
                        <div className="col-sm-9">
                            <div className="card-body">
                                <h2 className="card-title h5 mb-3">{project.titulo}</h2>
                                <p>{cortarTexto(project.descripcion)}</p>
                                <LinkAction to={`/posts/${project._id}`} buttonText={"Ver más"}/>
                            </div>
                        </div>
                    </div>
                    
                   
                </div>
            )}
            {posts.length === 0 && 
            <div className="text-center container mt-5">
                <p>No hay <NameTitle/> con ese criterio de búsqueda.</p>
            </div>
            }
            <BtnBack/>
    </div>
  
  )
}

export default PostViewAll;