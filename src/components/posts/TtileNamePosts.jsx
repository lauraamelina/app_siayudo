import React, {useContext} from "react";
import {AuthContext} from '../../context/AuthContext.jsx';

function TitleNamePosts() {
    const {user} = useContext(AuthContext);
    if(user.type === 2){
        return <span>campañas</span>
    }
    else {
        return <span>donaciones</span>

    }
}

export default TitleNamePosts;