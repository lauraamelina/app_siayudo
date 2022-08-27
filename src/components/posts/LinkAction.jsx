import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


function LinkAction({ to, buttonText }) {
    const {user} = useContext(AuthContext);

    let className = ''
    if(user.type === 2){
        className = 'btn boton-fundacion my-1'
    } else if(user.type === 1){
        className = 'btn btn-primary my-1'
    }

    return (
        <Link to={to} className={className}>{buttonText}</Link>
    )
}

export default LinkAction;