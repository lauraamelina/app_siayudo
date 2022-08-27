import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import * as CategoriaService from "../../services/categorias.services.js"
import * as authService from "../../services/auth.services.js"
import BtnAction from "./BtnAction.jsx"
import BtnBack from "./BtnBack.jsx"

function PostForm({onSubmit, buttonText}) {
    const creador = authService.getUser()
    
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [image, setImage] = useState("")
    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({nombre: "sin categoría"})
    const [imagePreview, setImagePreview] = useState("")
    const [error, setError] = useState("")
    


    useEffect(()=>{
        CategoriaService.traerCategorias()
            .then(categorias => setCategorias(categorias))   
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const newProject ={
            titulo, 
            descripcion, 
            creador, 
            categoria,
            image
        }
        for(let i = 0; i < categorias.length; i++){
            if(categorias[i]._id === newProject.categoria){
                newProject.categoria = categorias[i]
            }
        }
        onSubmit(newProject);        
    }

    function handleTitulo(event){
        setTitulo(event.target.value);
    }

    function handleDescripcion(event){
        setDescripcion(event.target.value);
    }

    function handleCategoria(event){
       setCategoria(event.target.value)
    }

    const handleImage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.result.length > 100000){ 
                setError("Tamaño de imagen muy grande")
            } else {
                setError("")
                setImagePreview(reader.result);
                setImage(reader.result.split(",")[1]);
            }
            
        }
        reader.readAsDataURL(event.target.files[0]);
        
      }
    

    return (
        <form onSubmit={handleSubmit} className="my-5" method="POST" encType="multipart/form-data" >
            {error.length > 0 && <p className="alert alert-danger">{error}</p>}

            <div className="mb-3">
                <label htmlFor="titulo" className="control-label" required>Título</label>
                <input type="text" className="form-control" id="titulo" value={titulo} onChange={handleTitulo} required/>
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="control-label">Descripción</label>
                <textarea className="form-control" id="descripcion" value={descripcion} onChange={handleDescripcion} rows="3" required></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="categorias" className="mb-2">Categoría</label>
                <select className="form-select" name="categorias" id="categorias" defaultValue={"sin categoria"} onChange={handleCategoria} required>
                    <option disabled value={"sin categoria"}>Seleccionar</option>
                    {categorias.map((unaCat) => (
                        <option key={unaCat._id} value={unaCat._id}>{unaCat.nombre}</option>

                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="form-label">Imagen</label>
                <input type="file" className="form-control" id="image" accept=".jpg,.png,.jpeg" filename={image} onChange={handleImage} required/>
                <small className="text-muted"> Sube una imagen para que todos puedan ver de qué se trata tu donación. </small>
            </div>

                {
                    imagePreview && 
                    <div className="imagen-perfil img-responsive">
                        <img src={imagePreview} alt="Preview imagen post"/>
                     </div>
                }


            <div className="d-flex mt-5">
                <BtnBack/>
                <BtnAction buttonText={buttonText} className="ms-auto mt4"/>
            </div>
        </form>
);
}

PostForm.defaultProps = {
    project: {},
    buttonText: "Guardar"
}

PostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
}

export default PostForm