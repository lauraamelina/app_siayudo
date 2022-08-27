import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin.services.js";
import {AuthContext} from '../../context/AuthContext.jsx';


function UsersAdmin() {
    let navigate = useNavigate()
    const {user} = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        adminService.getAllUsers()
        .then(users => setUsers(users))  
    }, []);

    useEffect(()=>{
        if(user.type !== 0){
            navigate(-1)
        }

    }, [])


  return (
    <div className="container">
        <h1 className="mb-5">Fundaciones pendientes</h1>
        {users &&  users.filter(user => user.type === 3).map(user => (
            <div className="card" key={user._id}>
                <div className="card-header d-flex">
                    <span className="ms-auto badge bg-warning text-dark">Pendiente</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link to={`/admin/users/${user._id}`} className="btn btn-primary">Ver usuario</Link>
                </div>

            </div>
        ))}

        {users &&  users.filter(user => user.type === 4).map(user => (
            <div className="card" key={user._id}>
                <div className="card-header d-flex">
                    <span className="ms-auto badge bg-danger">Rechazado</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link to={`/admin/users/${user._id}`} className="btn btn-primary">Ver usuario</Link>
                </div>

            </div>
        ))}

        {users &&  users.filter(user => user.type === 2).map(user => (
            <div className="card" key={user._id}>
                <div className="card-header d-flex">
                    <span className="ms-auto badge bg-success">Aprobado</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <Link to={`/admin/users/${user._id}`} className="btn btn-primary">Ver usuario</Link>
                </div>

            </div>
        ))}

        {users.length === 0 && <p className="my-5 text-center">No hay fundaciones pendientes de aprobación</p>}



    </div>
  );
}

export default UsersAdmin;