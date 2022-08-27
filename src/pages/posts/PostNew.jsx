import React from "react"
import { useNavigate } from "react-router-dom"
import * as PostService from "../../services/posts.services.js"
import PostForm from "../../components/posts/PostFormNew.jsx"
import TitleNamePosts from "../../components/posts/TtileNamePosts.jsx"

const PostNew = () => {
    let navigate = useNavigate();

    function saveProject(project) {

        PostService.create(project)
            .then(() => {
                navigate("/posts")
            })
        }

    return (
        <div className="container">
            <h1>Crear <TitleNamePosts/></h1>
            <PostForm onSubmit={saveProject} />
        </div>
    )
}


export default PostNew