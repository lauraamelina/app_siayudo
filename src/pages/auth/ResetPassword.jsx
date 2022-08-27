import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.services.js';

const ResetPassword = () => {
    const {token} = useParams();
    const {id} = useParams();
    let navigate = useNavigate();
    const[isError, setIsError] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[showpassword, setShowPassword] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setIsError("Las contraseñas no coinciden");
        } else {
            const userPassword = e.target.password.value
            authService.resetPassword(id, token, userPassword)
            .then(response => {
                navigate("/login");
            }).catch(err=>setIsError(err.message))
        }
        
    }
    
    const checkValidation = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass)
        if (password !== confirmPass){
            setIsError("La contraseña no coincide");
        } else {
            setIsError("");
        }
    }


    const switchShowPassword = () =>{
        setShowPassword(!showpassword);
    }


    return(
        <section className="registro-donantes">
            <div className="text-center">
                <h1>Cambiar contraseña</h1>
            </div>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña *</label>
                    <div className="containerPassword d-flex">
                         <input type={showpassword ? "text": "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} name ="password" placeholder="Introduce tu nueva contraseña" required className="form-control password"/>
                           
                     </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña *</label>
                    <div className="containerPassword d-flex">
                         <input type={showpassword ? "text": "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => checkValidation(e)} name ="confirmPassword" placeholder="Confirmá tu nueva contraseña" required className="form-control"/>
                     </div>
                </div>
                <div className="form-check">
                    <input type="checkbox" name="showpassword" id="showpassword" className="form-check-input" onChange={switchShowPassword}/>
                    <label htmlFor="showpassword" className="form-check-label"> Mostrar contraseña</label>
                </div>

                {isError !== "" && 
                        <div className="alert alert-danger text-center" role="alert">
                            {isError}
                        </div>
                }
                <button type="submit" className="btn btn-primary mb-3">Modificar</button>
         
            </form>
        </section>
    )}
export default ResetPassword;