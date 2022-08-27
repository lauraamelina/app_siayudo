import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeDonantes from '../../pages/home/HomeDonantes.jsx';
import HomeFundaciones from '../../pages/home/HomeFundaciones';
import * as authService from '../../services/auth.services.js';
import HomeAdmin from '../../pages/home/HomeAdmin.jsx';
import HomePending from '../../pages/home/HomePending.jsx';
import HomeRechazado from '../../pages/home/HomeRechazado.jsx';

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
            <Route path='/donantes' element={<HomeDonantes />} />
            <Route path='/fundaciones' element={<HomeFundaciones />} />
            <Route path='/admin' element={<HomeAdmin />} />
            <Route path='/pending' element={<HomePending />} />
            <Route path='/rechazado' element={<HomeRechazado />} />
        </Routes>

    )
}

export default RouteHome;