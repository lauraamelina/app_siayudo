import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import * as PostService from "../../services/posts.services.js";
import PostViewOne from "../../components/posts/PostViewOne.jsx";

function PagePostViewOne() {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        PostService.findById(id)
            .then(project => setProject(project));
    }, []);

  


  return (
    <PostViewOne project={project}/>
  )
}

export default PagePostViewOne;