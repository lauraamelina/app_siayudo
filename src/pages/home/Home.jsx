import React from "react";
import { Link } from "react-router-dom";
import voluntarios from '../../assets/img/voluntarios.png';
import tiempo from '../../assets/img/icono_tiempo.png';
import confianza from '../../assets/img/icono_confianza.png';
import contacto from '../../assets/img/icono_contacto.png';
import nosotros from '../../assets/img/personas_corazon.png';
import queHacemos from '../../assets/img/personas_ayudando.png';


function Home() {
    return (
      <div className="home">
        <h1 className="visually-hidden">Si ayudo - Página Principal</h1>
        <section className="banner container mb-5">
          <div className="row align-items-center">
              <div className="col-md-6 text-right">
                  <h2>Conectando solidaridad</h2>
                  <p>Desde <span className="celeste fw-bold">Siayudo</span>  conectamos donantes y fundaciones facilitando el contacto entre ambos.</p>
                  <Link to="/login" className="btn btn-primary text-uppercase">Donar ahora</Link>
              </div>
              <div className="col-md-6 text-center">
                  <img src={voluntarios} alt="" />
              </div>
          </div>
        </section>
        
        <section className="container introduccion">
          <p>Siayudo es una aplicación que <strong> conecta a los donantes o voluntarios con las fundaciones</strong> de Argentina que necesitan ayuda. 
            <br/>       
            Nuestra plataforma permite <strong>gestionar</strong> campañas, <strong>publicar</strong> donaciones, <strong>postulaciones</strong> a voluntariados entre otras cosas.
          </p>
        </section>      

        <section className="container objetivos">
          <h2 className="visually-hidden">Objetivos de SiAyudo</h2>
          <div className="row justify-content-center">
            <div className="card col-md-3">
              <img src={tiempo} className="card-img-top" alt=""/>
              <div className="card-body">
                <h3 className="card-title">Tiempo</h3>
                <p className="card-text">Optimización del tiempo de búsqueda</p>
              </div>
            </div>

            <div className="card col-md-3">
              <img src={confianza} className="card-img-top" alt=""/>
              <div className="card-body">
                <h3 className="card-title">Confianza</h3>
                <p className="card-text">Información transparente y confiable.</p>
              </div>
            </div>

            <div className="card col-md-3">
              <img src={contacto} className="card-img-top" alt=""/>
              <div className="card-body">
                <h3 className="card-title">Contacto</h3>
                <p className="card-text">Contacto rápido y sencillo entre donantes y fundaciones.</p>
              </div>
            </div>

          </div>
        </section>

        
        <section className="container nosotros" >
          <div className="row d-flex align-items-center mb-5" >
            <div className="col-md-6 order-1">
            	<h2>Sobre nosotros</h2>
                <p>Somos <span className="celeste fw-bold">Siayudo</span> una plataforma que permite vincular personas que quieran donar o ser voluntarios con las fundaciones que necesitan ayuda. <br />  <br />
                Cambiar el mundo puede sonar como un objetivo imposible, sin embargo todo tiene un comienzo y todo inicia en pequeño para luego generar un objetivo de grandes magnitudes. <strong> El paso a paso para una gran meta.</strong>
                  <br />
                
                 </p>
            </div>

            <div className="col-md-6 order-0">
              <img src={nosotros} alt=""/>
            </div>
          </div>

          <div className="row align-items-center" >
            <div className="col-md-6">
            	<h2>Qué hacemos</h2>
                <p>Desde <span className="celeste fw-bold">Siayudo</span> queremos lograr fomentar la cultura de donación y voluntariado y así de esta manera acortar ese camino y <strong>lograr una gran satisfacción</strong>  para aquellas personas que se encuentran en esa búsqueda.
                <br/> <br/>
                Buscamos brindarles, tanto a donantes como fundaciones, información necesaria para llevar a cabo su objetivo, como así también hacer visible las necesidades que tienen las fundaciones en el momento en que lo necesitan.
                </p>
            </div>

            <div className="col-md-6">
              <img src={queHacemos} alt=""/>
            </div>
          </div>
        </section>

        <section className="container-fluid ayuda">
          <div className="ms-auto">
            <p>“Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, puede cambiar el mundo” <br />
              Eduardo Galeano</p>
              <Link className="btn btn-primary" to={"/registro/donantes"}>Quiero ayudar</Link>
              <Link className="btn btn-primary" to={"/registro/fundaciones"}>Necesito ayuda</Link>
          </div>
        </section>
      </div>
    )
}
export default Home;