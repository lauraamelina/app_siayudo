import React, {useState, useEffect} from "react";
import * as authService from "../../services/auth.services.js"
import BtnAction from "./BtnAction.jsx";
import BtnBack from "./BtnBack.jsx";

function FormEdit({project, categorias, onSubmit}) {
    const creador = authService.getUser();

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [categoria, setCategoria] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [error, setError] = useState("")

    useEffect(()=>{
        setTitulo(project.titulo || "")
        setDescripcion(project.descripcion || "")
        setCategoria(project.categoria ? project.categoria._id : "")
        setImage(project.image || "")
    }, [project])

    function handleSubmit(event) {
        event.preventDefault();
        
        const newProject ={
            titulo, 
            descripcion, 
            creador, 
            categoria
        }
        for(let i = 0; i < categorias.length; i++){
            if(categorias[i]._id === newProject.categoria){
                newProject.categoria = categorias[i]
            }
        }

        if(image) {
            newProject.image = image    
        }
            onSubmit(newProject);
    }

    function handleTitulo(event){
        setTitulo(event.target.value)
    }

    function handleDescripcion(event){
        setDescripcion(event.target.value);
    }

    function handleCategoria(event){
       setCategoria(event.target.value)
    }

    function handleImage(event){

        const reader = new FileReader();
        reader.onload = () => {

        if(reader.result.length > 100000){ 
            setError("Tamaño de imagen muy grande")
            //elimina la imagen previa si hay una
            setImagePreview("")
            //elimina la imagen actual
            event.target.value = null;
        } else {
            setError("")
            setImagePreview(reader.result);

            setImage(reader.result.split(",")[1]);
        }
        
    }
    reader.readAsDataURL(event.target.files[0]);
    }
    

  return (
    <form onSubmit={handleSubmit} className="my-5" method="POST" encType="multipart/form-data">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="titulo" className="control-label" required>Título</label>
                <input type="text" className="form-control" id="titulo" value={titulo} onChange={handleTitulo} required/>
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="control-label">Descripción</label>
                <textarea className="form-control" id="descripcion" value={descripcion} onChange={handleDescripcion} rows="3" required></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="categorias" className="mb-2">Categoría</label>
                <select className="form-select" name="categorias" id="categorias" value={categoria} onChange={handleCategoria} required>
                    <option disabled >Seleccionar</option>
                    {categorias.map((unaCat) => (
                        <option key={unaCat._id} value={unaCat._id}>
                            {unaCat.nombre} 
                        </option>   
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="form-label" htmlFor="image" >Imagen</label>
                <input type="file" className="form-control" id="image" name="image" accept=".jpg,.png,.jpeg" filename={image} onChange={handleImage} />
                
                <div className="imagen-form-publicacion">
                    {
                        project.image && !imagePreview &&
                            <img className="card-img" src={`data:image/png;base64,${project.image}`} alt={project.titulo} />
                    }
                    
                    {
                        imagePreview && 
                            <img className="card-img" src={imagePreview} alt={project.titulo} />
                    }
                </div>
                


            </div>

            <div className="d-flex mt-5">
                <BtnBack/>
                <BtnAction buttonText={"Editar"}/>
            </div>
        </form>
  )
}

export default FormEdit;