import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import * as authService from './services/auth.services.js';
import '../src/assets/css/estilos.css';
import {AuthContext} from './context/AuthContext.jsx';



// HOME
import Home from './pages/home/Home.jsx';
// AUTH
import PageLogin from './pages/auth/PageLogin.jsx';
import Registro from './pages/auth/Registro.jsx';
import RegistroDonantes from './pages/auth/RegistroDonantes.jsx'
import RegistroFundaciones from './pages/auth/RegistroFundaciones.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
// LAYOUTS
import Header from './components/layouts/Header.jsx';
import Footer from './components/layouts/Footer.jsx';
import Page404 from './components/layouts/Page404.jsx';
// ROUTES 
import RoutePosts from './components/routes/RoutePosts.jsx'
import RouteHome from './components/routes/RouteHome.jsx'
import RouteProfile from './components/routes/RouteProfile.jsx'
import RouteAdmin from './components/routes/RouteAdmin.jsx'
import RouteChat from './components/routes/RouteChat.jsx'



function App() {
  let navigate = useNavigate()
  const user = authService.getUser()

    function onLogin(user, token) {
      authService.setUser(user)
      authService.setToken(token)

      if(user.type === 1) {
        navigate('/home/donantes')
      } else if(user.type === 2) {
        navigate('/home/fundaciones')
      } else if (user.type === 0) {
        navigate('/home/admin')
      } else if (user.type === 3) {
        navigate('/home/pending')
      } else if (user.type === 4) {
        navigate('/home/rechazado')
      }
    }


  return (
    <AuthContext.Provider value={{user}} >
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<Page404 />} />
      <Route path='/login' element={<PageLogin onLogin={onLogin}/>} />
      <Route path='/recuperacion' element={<ForgotPassword/>} />
      <Route path='/reset/:id/:token' element={<ResetPassword/>} />
    
      <Route path='/registro' element={<Registro />} />
      <Route path='/registro/donantes' element={<RegistroDonantes />} />
      <Route path='/registro/fundaciones' element={<RegistroFundaciones />} />

      <Route path='/chat/*' element={<RouteChat/>} />
      <Route path='/posts/*' element={<RoutePosts />} />
      <Route path='/home/*' element={<RouteHome />} />
      <Route path='/perfil/*' element={<RouteProfile />} />
      <Route path='/admin/*' element={<RouteAdmin />} />
    </Routes>
    <Footer/>
    </AuthContext.Provider>
  );
}

export default App;
