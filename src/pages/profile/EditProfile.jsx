import React, {useState, useEffect, useContext} from "react";
import * as UserService from "../../services/users.services.js";
import * as PostService from "../../services/posts.services.js";
import * as authService from "../../services/auth.services.js";
import foto from '../../assets/img/foto.png'
import {AuthContext } from '../../context/AuthContext.jsx';


function EditProfile() {
  const {user} = useContext(AuthContext);

  const [name, setName] = useState("");  
  const [email, setEmail] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        
        if(reader.result.length > 100000){ 
          setError("Tamaño de imagen muy grande")
          e.target.value = null
        } else {
          setError("")
          setImagePreview(reader.result);

          setImage(reader.result.split(",")[1]);
        }
      
    }
    reader.readAsDataURL(e.target.files[0]);
    
  }

  useEffect(() => {
    if(user) {  
      UserService.findUserById(user._id)
      .then(user => {
        setName(user.name)
        setEmail(user.email)
        setDireccion(user.direccion)
        setTelefono(user.telefono)
        setLocalidad(user.localidad)
        if (user.image) {
          setImage(user.image)  
        }

      }
      )}
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const newUser = {
      _id: user._id,  
      name, 
      email, 
      direccion,
      telefono,
      localidad,

    }

    if(image) {
      newUser.image = image
    }

    UserService.updateUser(newUser)
      .then(user => {
        authService.setUser(user)
        PostService.updatePostByUser(user._id)
        .then(() => {
          setMessage("Se actualizó el perfil correctamente")
      })
  })
  }
  
  return (
    <div className="editar-perfil container">
      {message.length > 0 && <p className="alert alert-success">{message}</p>}
      {error.length > 0 && <p className="alert alert-danger">{error}</p>}

      <h1>Editar perfil</h1>

      <section className="container card justify-content-center"> 
      <div className="imagen-perfil img-responsive">
        {
          imagePreview && 
            <img src={imagePreview} alt="Preview Foto de perfil" className="rounded-circle "/>}

        {
          image && !imagePreview && 
            <img src={`data:image/jpg;base64,${image}`}  alt="Preview Foto de perfil" className="rounded-circle "/>
        }  

        {
          !user.image && !imagePreview &&
            <img src={foto} alt="foto" className="rounded-circle"/>
        }
      </div>
    



        <label className="badge bg-secondary custom-file-upload">
          <input type="file" className="d-none" accept=".jpg,.png,.jpeg" filename={image} onChange={handleImage}/>
          Editar foto
        </label>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="text-muted">Nombre</label>
                <input type="text" className="form-control" id="name" value={name} onChange={e=> setName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="text-muted">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={e=> setEmail(e.target.value)}  />
            </div>

            <div className="mb-3">
                <label htmlFor="telefono" className="text-muted">Teléfono</label>
                <input required type="number" placeholder="Teléfono" className="form-control" id="telefono" value={telefono} onChange={e=> setTelefono(e.target.value)}  />
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className="text-muted">Dirección</label>
                <input required type="text" placeholder="Dirección" className="form-control" id="direccion" value={direccion} onChange={e=> setDireccion(e.target.value)}  />
            </div>
            <div className="mb-3">
                <label htmlFor="localidad" className="text-muted">Localidad</label>
                <input required type="text" placeholder="Localidad" className="form-control" id="localidad" value={localidad} onChange={e=> setLocalidad(e.target.value)}  />
              </div>
            <div className="mb-3">
                <button className="btn btn-primary w-100" type="submit">Guardar</button>
            </div>

          </form>  
        </div>
      </section>
    </div>
  )
}
export default EditProfile;