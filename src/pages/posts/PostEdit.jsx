import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as CategoriaService from "../../services/categorias.services.js"
import * as PostService from "../../services/posts.services.js"
import PostEditForm from "../../components/posts/PostFormEdit.jsx";

function PostEdit() {
    let navigate = useNavigate();
    const {id } = useParams();
    const [project , setProject] = useState([]) 
    const [categorias, setCategorias] = useState([])


    useEffect(()=>{
        PostService.findById(id)
            .then(post => setProject(post))   

    }, [])
    
    useEffect(()=>{
        CategoriaService.traerCategorias()
            .then(categorias => setCategorias(categorias))   

    }, [])


    function editProject(project) {
        PostService.update(id, project)
            .then(() => {
                navigate("/posts")
            })
    }

    return (
        <section className="container">
            <h1>Editar  "{project.titulo}"</h1>
            <PostEditForm project={project} categorias={categorias} onSubmit={editProject} />
        </section>
        
);
}


export default PostEdit