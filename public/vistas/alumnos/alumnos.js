export function modulo(){
    var $ = el => document.querySelector(el),
      frmAlumnos = $("#frm-alumnos");
    frmAlumnos.addEventListener("submit",e=>{
      e.preventDefault();
      e.stopPropagation();

      let alumnos = {
        accion    : frmAlumnos.dataset.accion,
        idAlumno  : frmAlumnos.dataset.idalumno,
        codigo    : $("#txtCodigoAlumno").value,
        nombre    : $("#txtNombreAlumno").value,
        direccion : $("#txtDireccionAlumno").value,
        telefono  : $("#txtTelefonoAlumno").value
      };
      fetch(`private/Modulos/alumnos/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{
        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
      });
    }); 
    frmAlumnos.addEventListener("reset",e=>{
        $("#frm-alumnos").dataset.accion = 'nuevo';
        $("#frm-alumnos").dataset.idalumno = '';
    });
}