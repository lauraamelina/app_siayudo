import React from "react";
import {useNavigate} from "react-router-dom";

function BtnBack() {
    let navigate = useNavigate();
    return (
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
            Volver
        </button>
    );
}

export  default BtnBack;