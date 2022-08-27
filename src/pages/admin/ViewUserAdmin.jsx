import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as userService from "../../services/users.services";
import * as adminService from "../../services/admin.services";
import swal from 'sweetalert';

function UsersAdmin() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [motivo, setMotivo] = useState("");

    useEffect(() => {
        userService.findUserById(id)
        .then(user => setUser(user))  
    }, []);

   
 
    const aprobar = () => {
        swal({
            title: "¿Estas seguro de que quieres aprobar a este usuario?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const status = 1;
                adminService.verificarUser(id, status)
                    .then(() => {
                        adminService.sendEmailAccept(user.email)
                        .then(() => {
                            swal(`Se aprobó al usuario "${user.name}"`, {
                                icon: "success",
                            });
                            navigate('/admin/usuarios');
                        })
                    })

                
            } else {
              swal("No se aprobó el usuario");
            }
          });


    }

    const rechazar = () => {
        swal({
            title: '¿Estas seguro de que quieres rechazar a este usuario?',
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const status = 0;
                adminService.verificarUser(id, status, motivo)
                    .then(() => {
                        adminService.sendEmailReject(user.email)
                        .then(() => {
                            swal(`Se rechazó al usuario "${user.name}"`, {
                                icon: "success",
                            });
                            navigate('/admin/usuarios');
                        })
                    })

                
            } else {
              swal("No se rechazó el usuario");
            }
          });

    }

    const switchShowForm = () =>{
        setShowForm(!showForm);
    }



  return (
    <div className="container userAdmin">
        <h1 className="mb-5">Fundación: <span className="violeta">{user.name}</span></h1>
        <ul className="list-group list-group-flush mb-5">
            <li  className="list-group-item"> <strong>Email:</strong> {user.email}</li>
            <li  className="list-group-item"> <strong>CUIT:</strong>  {user.cuit}</li>
            <li  className="list-group-item"> <strong>Teléfono: </strong>  {user.telefono}</li>
            <li  className="list-group-item"> <strong>Dirección: </strong>  {user.direccion}</li>
            <li  className="list-group-item"> <strong>Localidad:</strong>   {user.localidad}</li>
            {user.motivo && <li  className="list-group-item"> <strong className="text-danger">Motivo de rechazo:</strong> {user.motivo}</li>}
        </ul>

        {user.image &&
            <iframe title="Inscripción a IGJ" allowFullScreen src={`data:image/png;base64,${user.image}` } ></iframe>
        }

        {
            user.type === 3 &&
                <div className="d-flex mb-5">
                    <button onClick={switchShowForm} className="btn btn-danger me-auto">Rechazar</button>
                    <button onClick={aprobar} className="btn btn-success ms-auto">Aprobar</button>
                </div>
        }

        {
            showForm &&
                <div className="mb-5">
                    <h3 className="mb-3">Motivo de rechazo</h3>
                    <textarea className="form-control" rows="3" value={motivo} onChange={e=> setMotivo(e.target.value)} ></textarea>
                    <button onClick={rechazar} className="btn btn-danger mt-3">Rechazar</button>
                </div>
        
        }



       
        
        
            
    
    </div>
  );
}

export default UsersAdmin;