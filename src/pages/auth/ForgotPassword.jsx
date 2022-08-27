import React, {useState} from "react";
import * as authService from '../../services/auth.services.js'

 const ForgotPassword = () =>{
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleSubmit (event) {
        event.preventDefault();

        authService.forgotPassword(email)
        .then(response => {
            setMessage(response.message);
            setError("");
        })
        .catch(err=>setError(err.message))

    }
    
    return(
            <section className="registro-donantes">
                <div className="text-center">
                    <h1>Recuperar cuenta</h1>
                    <p> Para recuperar su cuenta, ingrese su correo electrónico.</p>
                </div>
              
                <form onSubmit={handleSubmit} className="container">
                    {message !== "" && 
                        <div className="alert alert-success text-center" role="alert">
                            {message}
                        </div>
                    }

                    {error !== "" && 
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-control" type="email" name="email" id="email" required value={email} onChange={e=> setEmail(e.target.value)} />
                    </div>  
                    <button type="submit" className="btn btn-primary mb-3">Enviar</button>
                </form>

            </section>
            
        
    )}

 export default ForgotPassword;