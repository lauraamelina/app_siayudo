import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as PostService from "../../services/posts.services.js";
import * as CategoriaService from '../../services/categorias.services.js';
import { AuthContext } from "../../context/AuthContext.jsx";

import LinkAction from "../../components/posts/LinkAction";

import donacion from '../../assets/img/donacion_personas.png';
import iconos from '../../components/posts/Iconos'



function HomeDonantes() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const [projects, setProjects] = useState([])
    
    useEffect(()=>{
        if(user.type !== 1){
            navigate(-1)
        }


        PostService.find()
        .then(projects => projects.filter(project => project.creador.type === 2))
        .then(projects => setProjects(projects.slice(0,3)))    
    }, [])

    const [categorias, setCategorias] = useState([])
    useEffect(()=>{
        CategoriaService.traerCategorias()
            .then(categorias => setCategorias(categorias))   

    }, [])


    return (
      <div className="homeD">
        <h1 className="visually-hidden">Si ayudo - Página Principal Donantes</h1>
        <section className="banner container mb-5">
          <div className="row align-items-center">
              <div className="col-md-7">
                  <h2>Bienvenido, <br/> <strong> {user.name} </strong></h2>
                  <LinkAction to="/posts/nuevo" buttonText="Publicar donación" />
              </div>
              <div className="col-md-5 text-center">
                  <img src={donacion} alt="Dos personas pasándose una caja de ropa" className="rounded-circle" />
              </div>
          </div>
        </section>
           

        <section className="container-fluid filtro">
          <h2 className="my-3 h1">Buscar campañas por categorías </h2>
          <div className="row align-items-center categoriasD justify-content-center">
            {categorias.map((categoria, i) => (
                <div className="card col-md-2 col-4 py-md-2" key={i}>
                    <div className="card-body d-flex flex-column">
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
            <h2 className="mb-4">Campañas</h2>
            <div className="row justify-content-center"> 

            {projects.map((project, i) => 
                    <div className="card col-md-3" key={i}>
                        {project.image && <img className="card-img-posts" src={`data:image/png;base64,${project.image}`} alt={project.titulo} />}
                        <div className="card-body card-body d-flex flex-column">
                            <h2 className="card-title h5">{project.titulo}</h2>
                            <p className="card-text my-auto">{project.creador.nombre}</p>
                            <div className="mt-auto">
                                <p className="card-text"> <span className="badge bg-secondary">{project.categoria.nombre}</span></p>
                                <LinkAction to={`/posts/${project._id}`} buttonText={"Ver más"}/>
                            </div>                        
                        </div>
                    </div>
            )}
            
            {projects.length === 0 && <p>No hay campañas publicadas aún</p>}
            </div>
        </section>
      </div>
    )
}
export default HomeDonantes;