import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PostList from '../../pages/posts/PostList.jsx';
import PagePostViewOne from '../../pages/posts/PagePostViewOne.jsx';
import PostEdit from '../../pages/posts/PostEdit.jsx';
import PostViewFilter from '../../pages/posts/PostViewFilter.jsx';
import MisPosts from '../../pages/posts/MisPosts.jsx';
import PostUser from '../../pages/posts/PostUser.jsx';
import PostNew from '../../pages/posts/PostNew.jsx';

import {PostContext} from '../../context/PostContext.jsx';

import * as PostService from '../../services/posts.services.js';
import * as authService from '../../services/auth.services.js';

function RoutePosts() {
    let navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const user = authService.getUser();

    useEffect(() => {
        if(!authService.getToken()) {
            navigate('/login', {replace: true})
          }
          if(!authService.getUser()) {
            navigate('/login', {replace: true})
          }


        if(user.type === 1) {
            PostService.find()
                .then(posts => posts.filter(posts => posts.creador.type === 2))
                .then(posts => setPosts(posts))   
          } else if(user.type === 2) {
            PostService.find()
                .then(posts => posts.filter(posts => posts.creador.type === 1))
                .then(posts => setPosts(posts))   
          }
          
    }, []);


   

    return (
        <PostContext.Provider value={{posts, setPosts}}>
            <Routes>
                <Route path='/list' element={<PostList />} />
                <Route path="/:id" element={<PagePostViewOne/>} />
                <Route path="/categoria/:categoria" element={<PostViewFilter />} />
                <Route path="/edit/:id" element={<PostEdit />} />
                <Route path='/' element={<MisPosts />} />
                <Route path='/nuevo' element={<PostNew />} />
                <Route path='/user/:idUser' element={<PostUser/>} />
            </Routes>
        </PostContext.Provider>

    )
    

}

export default RoutePosts;