function obtenerSesion(){

    var nombreUsuario = sessionStorage.getItem('nombre');
    return (nombreUsuario ===null || nombreUsuario === undefined)?window.location='../CarWash/login.html':false;
    
}

function cerrarSesion(){
    alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
        
        sessionStorage.clear();
        window.location = '../CarWash/login.html';
        
    }, function() {
        alertify.error('Cancelado');
        
    });
}

function obtenerDatosSesion(){
    var nombreUsuario = sessionStorage.getItem('nombre');
    var cargoUsuario = sessionStorage.getItem('cargo');
    var usuarioUsuario = sessionStorage.getItem('usuario');
    var codUsuario = sessionStorage.getItem('cod');
    console.log(nombreUsuario,   cargoUsuario,  usuarioUsuario, codUsuario);

    document.getElementById('nombrecargoUsu').innerHTML=''+nombreUsuario+', '+cargoUsuario;
    
}

function validarCargo(){
    var cargoUsuario = sessionStorage.getItem('cargo');

    if (cargoUsuario==='Mecanico' || cargoUsuario==='Lavador'){

        document.getElementById('personal').style.display = 'none';
        document.getElementById('mantenimiento').style.display = 'none';
        document.getElementById('estadisticas').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', e => {

    obtenerSesion();
    obtenerDatosSesion();
    validarCargo();
    function init() {
    
        $("[class*='mostrar']").click(function () {
    
            let modulo = $(this).data('module');
            
            console.log(modulo);
    
            $(`#vista-${modulo}`).load(`public/modulos/${modulo}/${modulo}.html`, function () {
    
                $(`#close-${modulo}`).click(function () {
                    
                    $(`#vista-${modulo}`).hide( "puff", "slow" );
    
                });
    
            }).draggable().show( "scale", 1000 );
    
    
        });
    
    }
    
    init();

})
