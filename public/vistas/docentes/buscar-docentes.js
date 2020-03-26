export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarDocentes = $("#txtBuscarDocente");
    frmBuscarDocentes.addEventListener('keyup', e=>{
        traerDatos(frmBuscarDocentes.value);
    });
    let modificarDocente = (docente)=>{
        $("#frm-docentes").dataset.accion = 'modificar';
        $("#frm-docentes").dataset.iddocente = docente.idDocente;
        $("#txtCodigoDocente").value = docente.codigo;
        $("#txtNombreDocente").value = docente.nombre;
        $("#txtNitDocente").value = docente.nit;
        $("#txtDireccionDocente").value = docente.direccion;
        $("#txtTelefonoDocente").value = docente.telefono;
    };
    let eliminarDocente = (idDocente)=>{
        if(confirm('¿Seguro que quiere eliminar?')){
            fetch(`private/Modulos/docentes/procesos.php?proceso=eliminarDocente&docente=${idDocente}`).then(resp=>resp.json()).then(resp=>{
                traerDatos('');
            });
        }
        
    };
    let traerDatos = (valor)=>{
        fetch(`private/Modulos/docentes/procesos.php?proceso=buscarDocente&docente=${valor}`).then(resp=>resp.json()).then(resp=>{
            let filas = '';
            resp.forEach(docente => {
                filas += `
                    <tr data-iddocente='${docente.idDocente}' data-docente='${JSON.stringify(docente)}'>
                        <td>${docente.codigo}</td>
                        <td>${docente.nombre}</td>
                        <td>${docente.nit}</td>
                        <td>${docente.direccion}</td>
                        <td>${docente.telefono}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-docentes > tbody").innerHTML = filas;
            $("#tbl-buscar-docentes > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.docente==null ){
                    eliminarDocente( e.srcElement.parentNode.parentNode.dataset.iddocente );
                } else {
                    modificarDocente( JSON.parse(e.srcElement.parentNode.dataset.docente) );
                }
            });
        });
    };
    traerDatos('');
}
