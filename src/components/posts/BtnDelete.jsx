import React from "react";

function BtnDelete({project, onClick}) {
  return (
      <button onClick={() => onClick(project._id)} className="btn btn-danger w-100">Eliminar</button>

  );
}

export default BtnDelete;