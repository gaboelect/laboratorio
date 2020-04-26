var appPersonal = new Vue({

    el:'#frmPersonal',

    data:{

        personal:{

            idPersonal  : '',
            accion    : $("#frmPersonal").data("accion"),
            Codigo    : '',
            Nombre    : '',
            Direccion : '',
            Telefono  : '',
            Cargo     : '',
            Usuario   : '',
            Password  : '',
            msg       : ''

        }

    },
    methods:{

        guardarPersonal:function(){

            console.log(JSON.stringify(this.personal));
            
            fetch(`private/Modulos/Personal/procesos.php?proceso=recibirDatos&personal=${JSON.stringify(this.personal)}`).then( resp=>resp.json() ).then(resp=>{
                this.personal.msg = resp.msg;
                this.personal.idPersonal = 0;
                this.personal.Codigo = '';
                this.personal.Nombre = '';
                this.personal.Direccion = '';
                this.personal.Telefono = '';
                this.personal.Usuario = '';
                this.personal.Password = '';
                this.personal.accion = 'nuevo';
                
            });

        },
        buscarPersonal:function(){

            appBuscarPersonal.buscarPersonal();

        }

    }
    
});

var appBuscarPersonal = new Vue({

    el:'#frm-buscar-personal',

    data:{
        personales:[],
        valor:''
    },
    methods:{

        buscarPersonal:function(){
            fetch(`private/Modulos/Personal/procesos.php?proceso=buscarPersonal&personal=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.personales = resp;
            });
        },
        modificarPersonal:function(personal){
            appPersonal.personal = personal;
            appPersonal.personal.accion = 'modificar';
            console.log(JSON.stringify(appPersonal.personal));
            
        },
        verificacionEliminacion:function(idPersonal){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarPersonal.eliminarPersonal(idPersonal);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarPersonal(id){
            console.log(id);
            
            fetch(`private/Modulos/Personal/procesos.php?proceso=eliminarPersonal&personal=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarPersonal();
            });
        }
    },
    created:function(){
        this.buscarPersonal();
    }

    
});