import React, { useEffect, useState, useContext } from "react"
import * as PostService from "../../services/posts.services.js"
import { AuthContext } from "../../context/AuthContext.jsx"
import { useParams } from "react-router-dom"
import PostViewAll from "../../components/posts/PostViewAll.jsx";
import TitleName from "../../components/posts/TitleName.jsx";


function PostFilter() {
    const {user} = useContext(AuthContext);
    const { categoria } = useParams();
    const [projects, setProjects] = useState([])
    
    useEffect(()=>{
        if(user.type === 1) {
            PostService.filterCategoria(categoria)
                .then(projects => projects.filter(project => project.creador.type === 2))
                .then(projects => setProjects(projects))   
        } else if(user.type === 2) {
            PostService.filterCategoria(categoria)
                .then(projects => projects.filter(project => project.creador.type === 1))
                .then(projects => setProjects(projects))   
        }

    }, [])

    return (
        <div className="container">
             <h1> <TitleName/> </h1>
            <PostViewAll posts={projects} />
        </div>
    )
}


export default PostFilter