var $ = el => document.querySelector(el),
    frmDocentes = $("#frmDocentes");
frmDocentes.addEventListener("submit",e=>{
    e.preventDefault();
    e.stopPropagation();
    
    let docentes = {
        accion    : 'nuevo',
        codigo    : $("#txtCodigoDocente").value,
        nombre    : $("#txtNombreDocente").value,
        direccion : $("#txtDireccionDocente").value,
        telefono  : $("#txtTelefonoDocente").value
    };
    fetch(`private/modulos/docentes/procesos.php?proceso=recibirDatos&docente=${JSON.stringify(docentes)}`).then( resp=>resp.json() ).then(resp=>{
        $("#respuestaDocente").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
    });
});