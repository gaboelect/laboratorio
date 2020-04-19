
Vue.component('v-select', VueSelect.VueSelect);

var appAgregarServicios = new Vue({

    el:'#frmAgregarServicios',

    data:{

        AgregarServicios:{

            idAgregarServicios  : '',
            accion      : $("#frmAgregarServicios").data("accion"),
            Cliente     : '',
            Tipo_Servicio    : '',
            Fecha   :   '',
            msg         : ''

        },
        Servicio : [],
        ServicioId : [],
        Cliente : [],
        ClienteId : []

    },
    methods:{

        guardarAgregarServicios:function(){

            for (let index = 0; index < this.Servicio.length; index++) {
                if (this.Servicio[index] == this.AgregarServicios.Tipo_Servicio) {
                    this.AgregarServicios.Tipo_Servicio = this.ServicioId[index];
                }
            }

            for (let index = 0; index < this.Cliente.length; index++) {
                if (this.Cliente[index] == this.AgregarServicios.Cliente) {
                    this.AgregarServicios.Cliente = this.ClienteId[index];
                }
            }

            console.log(JSON.stringify(this.AgregarServicios));
            
            
            fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=recibirDatos&AgregarServicio=${JSON.stringify(this.AgregarServicios)}`).then( resp=>resp.json() ).then(resp=>{
                this.AgregarServicios.msg = resp.msg;
                this.AgregarServicios.idAgregarServicios = 0;
                this.AgregarServicios.Cliente = '';
                this.AgregarServicios.Tipo_Servicio = '';
                this.AgregarServicios.Fecha  = '';
                this.AgregarServicios.accion = 'nuevo';
                
            });

        },
        buscarAgregarServicios:function(){

            appBuscarAgregarServicios.buscarAgregarServicios();

        }

    },
    created: function(){
        fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=traer_periodos_alumnos&AgregarServicio=`).then(resp=>resp.json()).then(resp=>{
            appAgregarServicios.Cliente = resp.Clientes;
            appAgregarServicios.ClienteId = resp.ClientesID;

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
            fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=buscarAgregarServicios&AgregarServicio=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.AgregarServicioses = resp;
            });
        },
        modificarAgregarServicios:function(AgregarServicios){
            appAgregarServicios.AgregarServicios.idAgregarServicios = AgregarServicios.Id_servicios;
            appAgregarServicios.AgregarServicios.Cliente = AgregarServicios.Nombre;
            appAgregarServicios.AgregarServicios.Tipo_Servicio = AgregarServicios.Servicio;
            appAgregarServicios.AgregarServicios.Fecha = AgregarServicios.Fecha;
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
                this.buscarAgregarServicios();
            });
        }
    },
    created:function(){
        this.buscarAgregarServicios();
    }

    
});