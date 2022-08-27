import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.services.js';
import PerfilAdmin from '../../pages/admin/PerfilAdmin.jsx';
import UsersAdmin from '../../pages/admin/UsersAdmin';
import ViewUserAdmin from '../../pages/admin/ViewUserAdmin';


function RouteHome() {
    const user = authService.getUser();
    let navigate = useNavigate();

    useEffect(()=> {
        if(!authService.getToken() || !authService.getUser() || user.type !== 0) {
          navigate('/login', {replace: true})
        }
        }, [])


    return (
        <Routes>
            <Route path='/perfil' element={<PerfilAdmin />} />
            <Route path='/usuarios' element={<UsersAdmin />} />
            <Route path='/users/:id' element={<ViewUserAdmin />} />
        </Routes>

    )
}

export default RouteHome;