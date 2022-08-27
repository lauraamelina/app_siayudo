import React, {useState, useEffect, useContext} from "react";
import * as PostService from "../../services/posts.services.js";
import * as CategoriaService from '../../services/categorias.services.js';
import LinkAction from "../../components/posts/LinkAction.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";


import voluntarios from '../../assets/img/voluntarios_dandose_manos.png';
import iconos from '../../components/posts/Iconos'

function HomeFundaciones() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);
    
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        if(user.type !== 2){
            navigate(-1)
        }

        PostService.find()
            .then(projects => projects.filter(project => project.creador.type === 1))
            .then(projects => setProjects(projects.slice(0,3)))    
   
    }, [])

    const [categorias, setCategorias] = useState([])
    useEffect(()=>{
        CategoriaService.traerCategorias()
            .then(categorias => setCategorias(categorias))   

    }, [])


    return (
      <div className="homeD">
        <h1 className="visually-hidden">Si ayudo - Página Principal Fundaciones</h1>
        <section className="banner container mb-5">
          <div className="row align-items-center">
              <div className="col-md-7">
                  <h2>Bienvenido, <strong> {user.name} </strong></h2>
                  <LinkAction to="/posts/nuevo" buttonText="Publicar campaña" />
              </div>
              <div className="col-md-5 text-center">
                  <img src={voluntarios} alt="Dos personas pasándose una caja de ropa" className="rounded-circle" />
              </div>
          </div>
        </section>
           

        <section className="container-fluid filtro">
          <h2 className="my-3">Buscar donaciones por categorías </h2>
          <div className="row align-items-center categoriasF justify-content-center">

          {categorias.map((categoria, i) => (
            <div className="card col-md-2 col-4 py-md-2" key={i}>
                <div className="card-body">
                    <Link to={`/posts/categoria/${categoria._id}`}>
                        <img src={iconos[categoria.nombre]} alt="Iconos"/>
                        <div className="align-self-end">
                            <h3 className="card-title h5">{categoria.nombre}</h3>
                        </div>
                    </Link>
                </div>
            </div>
            ))}
          </div>
        </section>
        
        <section className="campanias container">
            <h2 className="mb-3">Donaciones</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center"> 
                
            {projects.map((project, i) => 
                <div className="card postList col-md-3 px-0" key={i}>
                    {project.image && <img className="card-img-posts" src={`data:image/png;base64,${project.image}`} alt={project.titulo} />}
                    <div className="card-body d-flex flex-column">
                        <h2 className="card-title h5">{project.titulo}</h2>
                        <p className="card-text">{project.creador.nombre}</p>
                        <div className="mt-auto">
                            <p className="card-text"> <span className="badge bg-secondary">{project.categoria.nombre}</span></p>
                            <LinkAction to={`/posts/${project._id}`} buttonText={"Ver más"}/>
                        </div>
                    </div>
                </div>
            )}
        
            {projects.length === 0 && <p>No hay donaciones publicadas aún</p>}


            </div>
        </section>
      </div>
    )
}
export default HomeFundaciones;