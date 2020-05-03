var appPersonal = new Vue({

    el:'#frmPersonal',

    data:{

        personal:{

            idPersonal  : '',
            accion    : $("#frmPersonal").data("accion"),
            Descripcion : '',
            Sinopsis    : '',
            Genero : '',
            Duracion  : '',
            
            msg       : ''

        }

    },
    methods:{

        guardarPersonal:function(){

            console.log(JSON.stringify(this.personal));
            
            fetch(`private/Modulos/Personal/procesos.php?proceso=recibirDatos&personal=${JSON.stringify(this.personal)}`).then( resp=>resp.json() ).then(resp=>{
                this.personal.msg = resp.msg;
                this.personal.id_Pelicula = 0;
                this.personal.Descripcion = '';
                this.personal.Sinopsis = '';
                this.personal.Genero = '';
                this.personal.Duracion = '';
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