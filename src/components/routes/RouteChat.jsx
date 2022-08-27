import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Chat from '../../pages/chat/Chat.jsx';
import * as authService from '../../services/auth.services.js';
import Messages from '../../pages/chat/Messages.jsx';

function RouteHome() {
    let navigate = useNavigate();

    useEffect(()=> {
        if(!authService.getToken()) {
          navigate('/login', {replace: true})
        }
        if(!authService.getUser()) {
          navigate('/login', {replace: true})
        }
        }, [])


    return (
        <Routes>
            <Route path='/:user' element={<Chat />} />
            <Route path='/messages' element={<Messages />} />
        </Routes>

    )
}

export default RouteHome;