export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarAlumnos = $("#txtBuscarAlumno");
    frmBuscarAlumnos.addEventListener('keyup', e=>{
        traerDatos(frmBuscarAlumnos.value);
    });
    let modificarAlumno = (alumno)=>{
        $("#frm-alumnos").dataset.accion = 'modificar';
        $("#frm-alumnos").dataset.idalumno = alumno.idAlumno;
        $("#txtCodigoAlumno").value = alumno.codigo;
        $("#txtNombreAlumno").value = alumno.nombre;
        $("#txtDireccionAlumno").value = alumno.direccion;
        $("#txtTelefonoAlumno").value = alumno.telefono;
    };
    let eliminarAlumno = (idAlumno)=>{
        fetch(`private/Modulos/alumnos/procesos.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp=>resp.json()).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/Modulos/alumnos/procesos.php?proceso=buscarAlumno&alumno=${valor}`).then(resp=>resp.json()).then(resp=>{
            let filas = '';
            resp.forEach(alumno => {
                filas += `
                    <tr data-idalumno='${alumno.idAlumno}' data-alumno='${JSON.stringify(alumno)}'>
                        <td>${alumno.codigo}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.direccion}</td>
                        <td>${alumno.telefono}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-alumnos > tbody").innerHTML = filas;
            $("#tbl-buscar-alumnos > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.alumno==null ){
                    eliminarAlumno( e.srcElement.parentNode.parentNode.dataset.idalumno );
                } else {
                    modificarAlumno( JSON.parse(e.srcElement.parentNode.dataset.alumno) );
                }
            });
        });
    };
    traerDatos('');
}