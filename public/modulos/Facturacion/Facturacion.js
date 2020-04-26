Vue.component('v-select', VueSelect.VueSelect);

var appBuscarFacturacion = new Vue({

    el:'#frmFacturacion',

    data:{
        Facturaciones:[],
        valor:'',
        Factura : {
            accion : 'nuevo',
            tiempo: '',
            Trabajador : '',
            Cliente : ''
        },
        Trabajador : [],
        TrabajadorId : [],
        Cliente : [],
        ClienteId : []
    },
    methods:{

        buscarFacturacion:function(){
            var d = new Date();
            let Fecha = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2)  + "-" + ("0" + (d.getDate())).slice(-2);
            
            fetch(`private/Modulos/Facturacion/procesos.php?proceso=buscarFacturacion&Facturacion=${this.valor}&Fecha=${Fecha}`).then(resp=>resp.json()).then(resp=>{
                this.Facturaciones = resp;
            });
        },
        modificarFacturacion:function(Facturacion){
            appFacturacion.Facturacion = Facturacion;
            appFacturacion.Facturacion.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idFacturacion){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarFacturacion.eliminarFacturacion(idFacturacion);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarFacturacion(id){
            console.log(id);
            
            fetch(`private/Modulos/Facturacion/procesos.php?proceso=eliminarFacturacion&Facturacion=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarFacturacion();
            });
        },
        AgregarFactura:function() {

            for (let index = 0; index < this.Trabajador.length; index++) {
                if (this.Trabajador[index] == this.Factura.Trabajador) {
                    this.Factura.Trabajador = this.TrabajadorId[index];
                }
            }

            for (let index = 0; index < this.Cliente.length; index++) {
                if (this.Cliente[index] == this.Factura.Cliente) {
                    this.Factura.Cliente = this.ClienteId[index];
                }
            }
            
            var d = new Date();
            let Fecha_Hora = d.getFullYear() + "/" + (d.getMonth() + 1)  + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            
            this.Factura.tiempo = Fecha_Hora;

            fetch(`private/Modulos/Facturacion/procesos.php?proceso=recibirDatos&Facturacion=${JSON.stringify(this.Factura)}`).then( resp => resp.json()).then(resp => {
                alertify.success(resp.msg);
                appBuscarFacturacion.Factura.Trabajador = '';
                appBuscarFacturacion.Factura.Cliente = ''

                appBuscarFacturacion.buscarFacturacion();
            })

            console.log(JSON.stringify(this.Factura));
        },
        AddService: function (idFactura) {
            $('#cargarModal').load(`public/modulos/Agregarservicios/Agregarservicios.html`);
            $("#IDFactura").html(idFactura);
        },
        SalidaFactura: function (idFactura) {
            var d = new Date();
            let Fecha_Hora = d.getFullYear() + "/" + (d.getMonth() + 1)  + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            

            fetch(`private/Modulos/Facturacion/procesos.php?proceso=Salida&Facturacion=${idFactura}&Fecha=${Fecha_Hora}`).then( resp => resp.json()).then(resp => {
                alertify.success(resp.msg);

                appBuscarFacturacion.buscarFacturacion();
            })
        }
    },
    created:function(){
        this.buscarFacturacion();

        fetch(`private/Modulos/Personal/procesos.php?proceso=traer_periodos_alumnos&personal=`).then(resp=>resp.json()).then(resp=>{
            appBuscarFacturacion.Trabajador = resp.Clientes;
            appBuscarFacturacion.TrabajadorId = resp.ClientesID;

            
            
        });

        fetch(`private/Modulos/AgregarServicios/procesos.php?proceso=traer_periodos_alumnos&AgregarServicio=`).then(resp=>resp.json()).then(resp=>{
            appBuscarFacturacion.Cliente = resp.Clientes;
            appBuscarFacturacion.ClienteId = resp.ClientesID;
            
            
        });
    }

    
});

$("#CerrarModal").click(function () {
    appBuscarFacturacion.buscarFacturacion();
})
