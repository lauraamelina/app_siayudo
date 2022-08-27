import React, {useState, useEffect} from "react";
import SocketIo from "socket.io-client";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/auth.services.js";
import * as UserService from "../../services/users.services.js";
import * as ChatService from "../../services/chat.services.js";
import { useParams } from "react-router-dom";
import './Chat.css';
import foto from '../../assets/img/foto.png'
import timeago from '../../utilities/timeago.js';




function Chat () {
    let navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const userFrom = authService.getUser();
    const {user} = useParams();
    const [userTo, setUserTo] = useState(null);
    
    const socket = SocketIo("https://siayudo.herokuapp.com/", {
        transports: ['websocket']

    });
  

    useEffect(() => {
        UserService.findUserById(user)
        .then(user => {
            setUserTo({
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                image: user.image
            });
            ChatService.getMessages(userFrom._id, user._id)
            .then(messages => {
                setMessages(messages);
            })
        })

        if(userFrom._id === user){
            navigate(-1)
        }

    }, [])

    useEffect(() => {

        //hacemos para que el scroll se mueva al final
        const container = document.querySelector(".chat-history");
        container.scrollTop = container.scrollHeight;

        //escuchamos al socket para que se actualice la lista de mensajes
        socket.on("messages", (message, userFrom, userTo) => {

            if(messages.find(m => m._id === message._id)){
                return;
            }
            setMessages(messages => [...messages, message]);

        } );
    }, [messages])
            



    const submit = (e) => {
        e.preventDefault();
        socket.emit("message", message, userFrom, userTo);

        ChatService.addMessage({message, userFrom, 
            userTo: {
                ...userTo, image: null
            }})
            .then(() => {
                ChatService.getMessages(userFrom._id, userTo._id)
                .then(messages => {
                    setMessages(messages);
                })
            })

        ChatService.sendEmail(userTo._id, userFrom._id) 
        .then(() => {
            console.log("email sent")
        })

        
        setMessage("");

    }

    return (
        <div className="container-fluid">
            <h1 className="visually-hidden">Chat</h1>
            <div className="messenger">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div>
                                                {
                                                    userTo && userTo.image ? 
                                                    <img src={`data:image/png;base64,${userTo.image}`} alt="Foto de perfil"/>
                                                    : 
                                                    <img src={foto} alt="Foto de perfil"/>
                                                }
                                            </div>
                                            
                                           
                                            <div className="chat-about">
                                                <h5 className="m-b-0">{userTo && userTo.name}</h5>
                                                <small>{userTo && userTo.type === 1 ? 'Donante' : 'Fundación'}</small>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="chat-history">
                                    {messages && messages.map((message, i) => (
                                    <ul className="m-b-0" key={i}>
                                        {userTo && userTo._id === message.userTo._id ? (
                                            <li className="clearfix">
                                                <div className="message-data text-end">
                                                    <span className="message-data-time">{timeago(message.date)}</span>
                                                </div>
                                                <div className="message other-message float-right">{message.message}</div>
                                            </li>
                                        ) : (
                                            <li className="clearfix">
                                                <div className="message-data">
                                                    <span className="message-data-time"> {timeago(message.date)}</span>
                                                </div>
                                                <div className="message my-message">{message.message}</div>                                    
                                            </li>       
                                        )}


                                    
                                    </ul>
                                    ))}
                                    {
                                        messages && messages.length === 0 && (
                                            <div className="text-center">
                                                <p>No hay mensajes</p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="chat-message clearfix">
                                    <form className="input-group mb-0" onSubmit={submit}>
                                            <label htmlFor="message" className="visually-hidden">Mensaje</label>
                                            <textarea className="form-control text-justify" name="message" id="message" value={message} onChange={e => setMessage(e.target.value)} required></textarea>       

                                        <div className="input-group-prepend">
                                            <button type="submit">
                                                <span className="input-group-text"><i className="fa fa-send"></i></span>
                                            </button>
                                        </div>                            
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

        </div>
        
    )

}

export default Chat;