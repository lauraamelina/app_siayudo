import React, {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

function NameTitle() {
    const {user} = useContext(AuthContext);
    if(user.type === 2){
        return <span>Donaciones</span>
    } else {
        return <span>Campañas</span>
    }
}

export default NameTitle;