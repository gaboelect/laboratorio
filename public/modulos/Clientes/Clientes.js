var appCliente = new Vue({

    el:'#frmCliente',

    data:{

        Cliente:{

            idCliente  : '',
            accion    : $("#frmCliente").data("accion"),
            Codigo    : '',
            Nombre    : '',
            Direccion : '',
            Telefono  : '',
            Cargo     : '',
            msg       : ''

        }

    },
    methods:{

        guardarCliente:function(){

            console.log(JSON.stringify(this.Cliente));
            
            fetch(`private/Modulos/Clientes/procesos.php?proceso=recibirDatos&Cliente=${JSON.stringify(this.Cliente)}`).then( resp=>resp.json() ).then(resp=>{
                this.Cliente.msg = resp.msg;
                this.Cliente.idCliente = 0;
                this.Cliente.Codigo = '';
                this.Cliente.Nombre = '';
                this.Cliente.Direccion = '';
                this.Cliente.Telefono = '';
                this.Cliente.accion = 'nuevo';
                
            });

        },
        buscarCliente:function(){

            appBuscarCliente.buscarCliente();

        }

    }
    
});

var appBuscarCliente = new Vue({

    el:'#frm-buscar-cliente',

    data:{
        Clientees:[],
        valor:''
    },
    methods:{

        buscarCliente:function(){
            fetch(`private/Modulos/Clientes/procesos.php?proceso=buscarClientes&Cliente=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Clientees = resp;
            });
        },
        modificarCliente:function(Cliente){
            appCliente.Cliente = Cliente;
            appCliente.Cliente.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idCliente){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarCliente.eliminarCliente(idCliente);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarCliente(id){
            console.log(id);
            
            fetch(`private/Modulos/Clientes/procesos.php?proceso=eliminarClientes&Cliente=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarCliente();
            });
        }
    },
    created:function(){
        this.buscarCliente();
    }

    
});