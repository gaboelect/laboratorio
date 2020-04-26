
Vue.component('v-select', VueSelect.VueSelect);


var appAgregarServicios = new Vue({

    el:'#frmAgregarServicios',

    data:{

        AgregarServicios:{

            idAgregarServicios  : '',
            accion      : $("#frmAgregarServicios").data("accion"),
            Tipo_Servicio    : '',
            Factura :   '',
            msg         : ''

        },
        
        Servicio : [],
        ServicioId : []

    },
    methods:{

        guardarAgregarServicios:function(){

            for (let index = 0; index < this.Servicio.length; index++) {
                if (this.Servicio[index] == this.AgregarServicios.Tipo_Servicio) {
                    this.AgregarServicios.Tipo_Servicio = this.ServicioId[index];
                }
            }

            this.AgregarServicios.Factura = $("#IDFactura").html();
            console.log(JSON.stringify(this.AgregarServicios));
            
            
            fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=recibirDatos&AgregarServicio=${JSON.stringify(this.AgregarServicios)}`).then( resp=>resp.json() ).then(resp=>{
                this.AgregarServicios.msg = resp.msg;
                this.AgregarServicios.idAgregarServicios = 0;
                this.AgregarServicios.Tipo_Servicio = '';
                this.AgregarServicios.accion = 'nuevo';
                this.buscarAgregarServicios();
            });

        },
        buscarAgregarServicios:function(){

            appBuscarAgregarServicios.buscarAgregarServicios();

        }

    },
    created: function(){
        fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=traer_periodos_alumnos&AgregarServicio=`).then(resp=>resp.json()).then(resp=>{
            
            appAgregarServicios.Servicio = resp.Servicio;
            appAgregarServicios.ServicioId   = resp.ServicioID;

            console.log(appAgregarServicios.Cliente);
            // console.log(appAgregarServicios.options);
            
            
        });

    }
    
});


var appBuscarAgregarServicios = new Vue({

    el:'#frm-buscar-AgregarServicios',

    data:{
        AgregarServicioses:[],
        valor:''
    },
    methods:{

        buscarAgregarServicios:function(){
            let IdFactura = $("#IDFactura").html();
            fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=buscarAgregarServicios&AgregarServicio=${this.valor}&Factura=${IdFactura}`).then(resp=>resp.json()).then(resp=>{
                this.AgregarServicioses = resp;
            });
        },
        modificarAgregarServicios:function(AgregarServicios){
            appAgregarServicios.AgregarServicios.idAgregarServicios = AgregarServicios.Id_servicios;
            appAgregarServicios.AgregarServicios.Tipo_Servicio = AgregarServicios.Servicio;
            appAgregarServicios.AgregarServicios.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idAgregarServicios){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarAgregarServicios.eliminarAgregarServicios(idAgregarServicios);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarAgregarServicios(id){
            console.log(id);
            
            fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=eliminarAgregarServicios&AgregarServicio=${id}`).then(resp=>resp.json()).then(resp=>{
                
                appBuscarAgregarServicios.buscarAgregarServicios();
            });
        }
    },
    created:function(){
        this.buscarAgregarServicios();
    }

    
});
