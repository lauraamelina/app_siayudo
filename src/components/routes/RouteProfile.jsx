import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Perfil from '../../pages/profile/Profile.jsx';
import EditProfile from '../../pages/profile/EditProfile.jsx';
import * as authService from '../../services/auth.services.js';

function RouteProfile() {
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
            <Route path='/' element={<Perfil />} />
            <Route path='/editar' element={<EditProfile />} />
        </Routes>

    )
}
export default RouteProfile;