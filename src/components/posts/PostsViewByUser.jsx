import React, {useContext} from "react";
import { Link } from "react-router-dom";
import BtnDelete from "./BtnDelete.jsx";
import * as PostService from "../../services/posts.services.js";
import LinkAction from "./LinkAction.jsx";
import {AuthContext} from '../../context/AuthContext.jsx';
import swal from 'sweetalert';


function PostsViewAll({projects, setProjects}) {
    const {user} = useContext(AuthContext);

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha)
        return fechaFormateada.toLocaleDateString()
    }

    const cortarTexto = (texto) => {
        if (texto.length > 80) {
            return texto.substring(0, 80) + '...'
        } else {
            return texto
        }
    }

    function handleDelete(id) {
        swal({
            title: "¿Estás seguro de eliminar esta publicación?",
            text: "Una vez eliminado, no podrás recuperarla",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                PostService.deletePost(id)
                    .then(() => {
                        PostService.findByUser(user._id)
                        .then(projects => {setProjects(projects)})
                    })
                swal("Se eliminó la publicación con éxito!'", {
                    icon: "success",
              });
            } else {
              swal("No se eliminó la publicación");
            }
          });

    }

    return (
        <div>
            <div className="row justify-content-center">
                {projects.length > 0 && projects.map((project,i) => (
                <div className="card pe-0 ps-0 col-xl-4 mx-2" key={i}>
                    <div className="card-header">
                        {formatearFecha(project.createdAt)}
                        {project.categoria.nombre && <p className="badge bg-secondary float-end mb-0"> {project.categoria.nombre}</p>}
                    </div>
                    {/* <img src="..." className="card-img-top" alt="..."> */}
                    <div className="card-body d-flex flex-column">
                        <h2 className="card-title h4">{project.titulo}</h2>
                        <p className="card-text">{cortarTexto(project.descripcion)}</p>
                        <div className="mt-auto d-flex justify-content-around align-items-center botones">
                            <LinkAction to={`/posts/${project._id}`} buttonText={"Ver"}/>
                            <Link to={`/posts/edit/${project._id}`} className="btn btn-secondary">Editar</Link>
                            <BtnDelete project={project} onClick={handleDelete} />
                        </div>
                        
                    </div>
                </div>
            ))}
            </div>
                
            {projects.length === 0 && 
            <div>
                <p className="text-center h5 my-5">No tenés publicaciones todavía</p>
                <LinkAction to="/posts/nuevo" buttonText={"Publicar"}/>
            </div>}
        </div>
    )
}

export default PostsViewAll;