import React, { useEffect, useState, useContext } from "react";
import * as UserService from "../../services/users.services.js";
import { useNavigate } from "react-router-dom";
import foto from '../../assets/img/foto.png'
import PostCount from "../../components/posts/PostCount.jsx";
import LinkAction from "../../components/posts/LinkAction.jsx";
import {AuthContext} from '../../context/AuthContext.jsx';


function Perfil() {
  let navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      UserService.findUserById(user._id).then(user => {
        setImage(user.image);
      }
      );
    }
  }, []);


  const formatearCuit = (cuit) => {
    return cuit.replace(/^(\d{2})(\d{8})(\d{1})$/, "$1-$2-$3")
  }  

  if(user) {
    return (
      <div className="perfil container">
      <h1>Mi perfil</h1>
      <section className="container card justify-content-center">  
        <div className="imagen-perfil img-responsive">
          {
            image ? (
              <img src={`data:image/png;base64,${image}`}  alt="Foto de perfil" className="rounded-circle "/>
            ) : (
              <img src={foto} alt="Foto de perfil" className="rounded-circle"/>
            )
          }
        </div>
        

        <div>
          <p className="fw-bold h3 mt-3">{user.name}</p> 
          <p>{user.email}</p>
          {user.cuit && <p>Cuit: {formatearCuit(user.cuit)}</p>}
          <p><span className={user.type === 1 ? 'celeste h4 me-2' : 'violeta h4 me-2'}> <PostCount/> </span> publicaciones realizadas</p>
   
        </div>
        <LinkAction to="/perfil/editar" buttonText="Editar perfil" />
      </section>
    </div>
    );
} else {
    navigate('/login')
}

}
export default Perfil;