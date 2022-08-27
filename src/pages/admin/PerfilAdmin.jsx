import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import foto from '../../assets/img/foto.png'
import {AuthContext} from '../../context/AuthContext.jsx';


function PerfilAdmin() {
  let navigate = useNavigate();
  const {user} = useContext(AuthContext);


  if(user && user.type === 0) {
    return (
      <div className="perfil container">
      <h1>Mi perfil</h1>
      <section className="container card justify-content-center">  

        <div className="imagen-perfil img-responsive">
            <img src={foto} alt="Foto de perfil" className="rounded-circle"/>
        </div>
        

        <div>
            <p className="fw-bold h3 mt-3">{user.name}</p> 
            <p>{user.email}</p>   
        </div>
      </section>
    </div>
    );
} else {
    navigate('/login')
}

}
export default PerfilAdmin;