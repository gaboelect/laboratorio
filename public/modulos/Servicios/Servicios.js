var appServicio = new Vue({

    el:'#frmServicio',

    data:{

        Servicio:{

            idServicio  : '',
            accion      : $("#frmServicio").data("accion"),
            Servicio    : '',
            Costo       : '',
            msg         : ''

        }

    },
    methods:{

        guardarServicio:function(){

            console.log(JSON.stringify(this.Servicio));
            
            fetch(`private/Modulos/Servicios/procesos.php?proceso=recibirDatos&Servicio=${JSON.stringify(this.Servicio)}`).then( resp=>resp.json() ).then(resp=>{
                this.Servicio.msg = resp.msg;
                this.Servicio.idServicio = 0;
                this.Servicio.Servicio = '';
                this.Servicio.Costo = '';
                this.Servicio.accion = 'nuevo';
                
            });

        },
        buscarServicio:function(){

            appBuscarServicio.buscarServicio();

        }

    }
    
});

var appBuscarServicio = new Vue({

    el:'#frm-buscar-Servicio',

    data:{
        Servicioes:[],
        valor:''
    },
    methods:{

        buscarServicio:function(){
            fetch(`private/Modulos/Servicios/procesos.php?proceso=buscarTipoServicios&Servicio=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Servicioes = resp;
            });
        },
        modificarServicio:function(Servicio){
            appServicio.Servicio = Servicio;
            appServicio.Servicio.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idServicio){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarServicio.eliminarServicio(idServicio);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarServicio(id){
            console.log(id);
            
            fetch(`private/Modulos/Servicios/procesos.php?proceso=eliminarTipoServicios&Servicio=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarServicio();
            });
        }
    },
    created:function(){
        this.buscarServicio();
    }

    
});