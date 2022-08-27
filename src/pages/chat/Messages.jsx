import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as chatService from "../../services/chat.services";
import {foto} from '../../assets/img/foto.png'
import './Chat.css'
import {AuthContext} from '../../context/AuthContext.jsx';

function Messages() {
    const {user} = useContext(AuthContext);
    const [users, setusers] = useState([]);

    useEffect(() => {
        chatService.getInbox(user._id)
        .then(res => {
            setusers(res)
        })        
    }, []);


  return(
    <div className="container container-inbox">
        <h1>Mensajes</h1>
        {users.map(user => (
            <div id="plist" className="people-list" key={user._id}>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                    <Link to={`/chat/${user._id}`}>
                        <li className="clearfix">
                            {
                                user.image ?
                                    <img src={`data:image/png;base64,${user.image}`} alt="avatar"/>
                                :
                                    <img src={foto} alt="avatar"/>
                            }
                            <div className="about ms-2">
                                <h1 className="name">{user.name}</h1>
                                <div className="status"> <i className="fa fa-circle offline"></i> {user.email} </div>                                            
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        ))}

        {
            users.length === 0 &&
            <div className="text-center container my-5">
                <p>No tenés conversaciones todavía</p>
            </div>
        }

    </div>
  )
}

export default Messages;