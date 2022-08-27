import React, {useEffect, useState, useContext} from "react";
import * as adminService from "../../services/admin.services.js";
import {useNavigate } from "react-router-dom";
import {Chart} from 'react-google-charts';
import {AuthContext} from '../../context/AuthContext';

function HomeAdmin() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const [categorias, setCategorias] = useState([]);
    const [typeUser, setTypeUser] = useState([]);
    
    useEffect(()=>{
        if(user.type !== 0){
            navigate(-1)
        }
        adminService.getCategoriasFromPosts() 
        .then(categorias => setCategorias(categorias.map(categoria => [categoria._id, categoria.count])))

        adminService.getPostsByTypeUser()
        .then(posts => setTypeUser(posts.map(post => [post._id === 1 ? 'Donante' : 'Fundación', post.count])))

    }, [])

    const dataCategoria = [
        ['Categoria', 'Cantidad'],
        ...categorias
    ]
    const dataTipoUsuario = [
        ['Tipo de usuario', 'Cantidad', { role: "style" }],
        ...typeUser.map((tipo, index) => {
            if(index === 1){
                return [tipo[0], tipo[1], "color: #00a6a6"]
            } else {
                return [tipo[0], tipo[1], "color: #5e0059"]
            }
        })
    ]

    return (
        <div className="homeD text-center">
            <h1 className="visually-hidden">Si ayudo - Página Principal Administradores</h1>
            <h2>Dashboard</h2>            
            
            <section className="container text-center">
                <h3>Tipos de usuarios en los posts</h3>
                <Chart chartType="ColumnChart" width="100%" height="400px" data={dataTipoUsuario} />
            </section>

            <section className="container text-center">
                <h3>Las categorías en los posts</h3>
                <Chart chartType="ColumnChart" width="100%" height="400px" data={dataCategoria} />
            </section>
        </div>
    )
}

export default HomeAdmin;