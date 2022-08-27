import React, { useState, useContext } from "react";
import * as PostService from "../../services/posts.services.js";
import {AuthContext} from '../../context/AuthContext.jsx';

function PostCount() {
    const [projects, setProjects] = useState([])
    const {user} = useContext(AuthContext);


    useState(() => {
        PostService.findByUser(user._id)
            .then(projects => setProjects(projects))
    }, [])


    return (
        <span>{projects.length}</span>
    )
}

export default PostCount;