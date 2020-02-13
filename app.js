
			function salvarForm(){
				//if(typeof(Storage) !== "undefined") {//incrementamos 0+1=1 al inicio
					/*if (localStorage.cont) {
						localStorage.cont = Number(localStorage.cont)+1;//al guardar un nuevo suma 1
					} else {
						localStorage.cont = 1;
					}
                    cad = document.getElementById("txtCodigoAlumno").value + ';' + document.getElementById("txtNombreAlumno").value + ';'
                    + document.getElementById("txtDireccionAlumno").value + ';' + document.getElementById("txtTelefonoAlumno").value + ';'
                    ;*/

                    let codigo=document.getElementById("txtCodigoAlumno").value;
                    let nombre=document.getElementById("txtNombreAlumno").value;
                    let direccion=document.getElementById("txtDireccionAlumno").value;
                    let telefono=document.getElementById("txtTelefonoAlumno").value;

                    if(codigo!="" || nombre!="" || direccion!="" || telefono!=""){
                        localStorage.setItem("codigo"+codigo,codigo);
                        localStorage.setItem("nombre"+codigo,nombre);
                        localStorage.setItem("direccion"+codigo,direccion);
                        localStorage.setItem("telefono"+codigo,telefono);

                        limpiar();
                       
                    }

                    
                    
			//	} else {
					
				//}
            }

            function buscarForm(){
                let codigo=document.getElementById("txtCodigoAlumno").value;
                document.querySelector("#txtNombreAlumno").value=localStorage.getItem("nombre"+codigo);
                document.querySelector("#txtDireccionAlumno").value=localStorage.getItem("direccion"+codigo);
                document.querySelector("#txtTelefonoAlumno").value=localStorage.getItem("telefono"+codigo);
            
            }
            function deleteForm(){
                let codigo=document.getElementById("txtCodigoAlumno").value;
                document.querySelector("#txtCodigoAlumno").value=localStorage.removeItem("codigo"+codigo);
                document.querySelector("#txtNombreAlumno").value=localStorage.removeItem("nombre"+codigo);
                document.querySelector("#txtDireccionAlumno").value=localStorage.removeItem("direccion"+codigo);
                document.querySelector("#txtTelefonoAlumno").value=localStorage.removeItem("telefono"+codigo);

                document.querySelector("#txtCodigoAlumno").value="";
                document.querySelector("#txtNombreAlumno").value ="";
                document.querySelector("#txtDireccionAlumno").value ="";
                document.querySelector("#txtTelefonoAlumno").value= "";


            }
            function limpiar(){

                document.querySelector("#txtCodigoAlumno").value="";
                document.querySelector("#txtNombreAlumno").value ="";
                document.querySelector("#txtDireccionAlumno").value ="";
                document.querySelector("#txtTelefonoAlumno").value= "";
            }
		


/*document.addEventListener("DOMContentLoaded",function(e){
    alert("CALLBACK LISTO");
});*/

/*document.addEventListener("DOMContentLoaded", init);
function init(e){
    alert("LISTO");
}*/