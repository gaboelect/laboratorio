var appRegistrarse = new Vue({

    el:'#frm-registrarse',

    data:{

        personal:{

            idPersonal  : '',
            accion    : 'nuevo',
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

        guardarRegistroLogin:function(){

            console.log(JSON.stringify(this.personal));
        
            fetch(`private/Modulos/Personal/procesos.php?proceso=recibirDatos&personal=${JSON.stringify(this.personal)}`).then( resp=>resp.json() ).then(resp=>{
             
                console.log (this.personal.Nombre);
                
                sessionStorage.setItem('nombre',this.personal.Nombre);
                sessionStorage.setItem( 'codigo',this.personal.Codigo);
                sessionStorage.setItem('cargo',this.personal.Cargo);
                sessionStorage.setItem('usuario',this.personal.Usuario);

                
                this.personal.msg = resp.msg;
                this.personal.idPersonal = 0;
                this.personal.Codigo = '';
                this.personal.Nombre = '';
                this.personal.Direccion = '';
                this.personal.Telefono = '';
                this.personal.Usuario = '';
                this.personal.Password = '';
                this.personal.accion = 'nuevo';

                irHome();
            });
           
          
        },

        tengoCuenta:function(){
            window.location = '../CarWash/login.html'
        },
        irHome:function(){
            window.location = '/CarWash/';
        
        }
    }
    
});

var appLogin = new Vue({

    el: '#frm-login',

    data:{
        Login:{
            idPersonal  : '',
            accion    : 'login',
            Codigo    : '99999999',
            Nombre    : 'kaka',
            Direccion : 'kaka',
            Telefono  : 'kaka',
            Cargo     : 'kaka',
            Usuario   : '',
            Password  : '',
            msg       : ''
        }
    },

    methods:{

        validarDatosUsuario:function(){

            fetch(`private/Modulos/Personal/procesos.php?proceso=recibirDatos&personal=${JSON.stringify(this.Login)}`).then( resp=>resp.json() ).then(resp=>{

                console.log(resp.nombre);
                console.log(resp.cont);

            if(resp.cont >0){
                
                sessionStorage.setItem('nombre',resp.nombre);
                sessionStorage.setItem('cargo',resp.cargo);
                sessionStorage.setItem('usuario',resp.usuario);
                sessionStorage.setItem('cod',resp.codigo);
                irHome();
            }
            else if (resp.cont ==0){
                alertify.error('El usuario o contraseña son incorrectos');
            }
            });
        },

        crearCuenta:function(){
            window.location = '../CarWash/registrarse.html'
        }
    }
});

 function irHome(){
    window.location = '/CarWash/';
}