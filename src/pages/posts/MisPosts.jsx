import React, {useState, useEffect, useContext} from "react";
import * as PostService from "../../services/posts.services.js"
import PostsViewByUser from "../../components/posts/PostsViewByUser.jsx";
import TitleNamePosts from "../../components/posts/TtileNamePosts.jsx";
import {AuthContext} from '../../context/AuthContext.jsx';


function MisPosts() {
    const {user} = useContext(AuthContext);

    const [projects, setProjects] = useState([])


    useEffect(()=>{
      PostService.findByUser(user._id)
        .then(projects => setProjects(projects))
            
    }, [])

    useEffect(()=>{
        setProjects(projects)
    }, [projects])

    


    return (
      <div className="publicaciones container">
        <h1>Mis <TitleNamePosts/> </h1>
            <PostsViewByUser projects={projects} setProjects={setProjects}/>
      </div>
    )
}
export default MisPosts;