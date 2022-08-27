import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostViewAll from "../../components/posts/PostViewAll.jsx";
import * as PostService from "../../services/posts.services.js";
import * as UserService from "../../services/users.services.js";

function PostUser() {
    const { idUser } = useParams();
    const [user, setUser] = useState({})
    const [projects, setProjects] = useState([])

    useEffect(() => {
        PostService.findByUser(idUser)
        .then(projects => {setProjects(projects)})

        UserService.findUserById(idUser)
        .then(user => {setUser(user)})


    }, [])

    if(!user) {
        return (
            <p>No existe ese usuario </p>
        )
    } else {
        return (
            <div className="container">
                <h1>Publicaciones de {user.name}</h1>
                <PostViewAll projects={projects}/>
            </div>
        );
    }





}

export default PostUser;