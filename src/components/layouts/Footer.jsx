import React from 'react'
import{Link}from "react-router-dom"

function Footer() {
    return(
        <footer>
            <div className="my-3 info-footer">
                <ul>
                    <li className='footer-logo'>SiAyudo</li>
                    <li className='footer-ubicacion'>Buenos Aires, Argentina</li>
                    <li className='footer-telefono'>0800 222 2345</li>
                    <li className="footer-mail"><Link to={"/#"} target="_blank">info@siayudo.com.ar </Link></li>
                </ul>
            </div>
            <div className='redes'>
                <ul>
                    <li><Link to={"https://www.facebook.com/"} id="fb" target="_blank">Facebook </Link></li>
                    <li><Link to={"https://www.instagram.com/si.ayudo/"} id="ig" target="_blank">Instagram </Link></li>
                    <li><Link to={"https://web.whatsapp.com/%F0%9F%8C%90/es"} id="wp" target="_blank">Whatsapp </Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer



