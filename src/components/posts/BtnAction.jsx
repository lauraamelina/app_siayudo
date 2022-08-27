import React, {useContext}  from "react";
import { AuthContext } from "../../context/AuthContext";

function BtnAction({buttonText}) {
    const {user} = useContext(AuthContext);
    if(user.type === 1){
        return (
            <button className='btn btn-primary ms-auto h-100' type="submit">{buttonText}</button>
        )

    } else {
        return (
            <button className='btn boton-fundacion ms-auto' type="submit" >{buttonText}</button>
        )

    }
}

export default BtnAction;