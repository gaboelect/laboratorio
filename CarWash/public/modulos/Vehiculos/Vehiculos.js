
Vue.component('v-select', VueSelect.VueSelect);

var appVehiculos = new Vue({

    el:'#frmVehiculos',

    data:{

        Vehiculos:{

            idVehiculos  : '',
            accion      : $("#frmVehiculos").data("accion"),
            Cliente     : '',
            Placa    : '',
            Tipo_Vehiculo   :   '',
            Marca       : '',
            msg         : ''

        },
        options: [],
        VehiculosTipo:[],
        optionsId: [],
        VehiculosTipoId:[]

    },
    methods:{

        guardarVehiculos:function(){

            for (let index = 0; index < this.VehiculosTipo.length; index++) {
                if (this.VehiculosTipo[index] == this.Vehiculos.Tipo_Vehiculo) {
                    this.Vehiculos.Tipo_Vehiculo = this.VehiculosTipoId[index];
                }
            }

            for (let index = 0; index < this.options.length; index++) {
                if (this.options[index] == this.Vehiculos.Cliente) {
                    this.Vehiculos.Cliente = this.optionsId[index];
                }
            }

            console.log(JSON.stringify(this.Vehiculos));
            
            
            fetch(`private/Modulos/Vehiculos/procesos.php?proceso=recibirDatos&Vehiculos=${JSON.stringify(this.Vehiculos)}`).then( resp=>resp.json() ).then(resp=>{
                this.Vehiculos.msg = resp.msg;
                this.Vehiculos.idVehiculos = 0;
                this.Vehiculos.Cliente = '';
                this.Vehiculos.Placa = '';
                this.Vehiculos.Tipo_Vehiculo  = '';
                this.Vehiculos.Marca = '';
                this.Vehiculos.accion = 'nuevo';
                
            });

        },
        buscarVehiculos:function(){

            appBuscarVehiculos.buscarVehiculos();

        }

    },
    created: function(){
        fetch(`private/Modulos/Clientes/procesos.php?proceso=traer_periodos_alumnos&Cliente=`).then(resp=>resp.json()).then(resp=>{
            appVehiculos.options = resp.Clientes;
            appVehiculos.VehiculosTipo = resp.TipoVehiculos;
            appVehiculos.optionsId = resp.IDClientes;
            appVehiculos.VehiculosTipoId = resp.IDVehiculos;

            console.log(appVehiculos.VehiculosTipo);
            console.log(appVehiculos.options);
            
            
        });

    }
    
});

var appBuscarVehiculos = new Vue({

    el:'#frm-buscar-Vehiculos',

    data:{
        Vehiculoses:[],
        valor:''
    },
    methods:{

        buscarVehiculos:function(){
            fetch(`private/Modulos/Vehiculos/procesos.php?proceso=buscarVehiculos&Vehiculos=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Vehiculoses = resp;
            });
        },
        modificarVehiculos:function(Vehiculos){
            appVehiculos.Vehiculos.idVehiculos = Vehiculos.Id_Vehiculos;
            appVehiculos.Vehiculos.Cliente = Vehiculos.Nombre;
            appVehiculos.Vehiculos.Placa = Vehiculos.Placa;
            appVehiculos.Vehiculos.Tipo_Vehiculo = Vehiculos.TipoVehiculo;
            appVehiculos.Vehiculos.Marca = Vehiculos.Marca;
            appVehiculos.Vehiculos.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idVehiculos){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarVehiculos.eliminarVehiculos(idVehiculos);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarVehiculos(id){
            console.log(id);
            
            fetch(`private/Modulos/Vehiculos/procesos.php?proceso=eliminarVehiculos&Vehiculos=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarVehiculos();
            });
        }
    },
    created:function(){
        this.buscarVehiculos();
    }

    
});