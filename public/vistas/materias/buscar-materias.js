var appBuscarMaterias = new Vue({
    el:'#frm-buscar-materias',
    data:{
        mismaterias:[],
        valor:''
    },
    methods:{
        buscarMateria:function(){
            fetch(`private/Modulos/materias/procesos.php?proceso=buscarMateria&materia=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.mismaterias = resp;
            });
        },
        modificarMateria:function(materia){
            appmateria.materia = materia;
            appmateria.materia.accion = 'modificar';
        },
        eliminarMateria:function(idMateria){
            fetch(`private/Modulos/materias/procesos.php?proceso=eliminarMateria&materia=${idMateria}`).then(resp=>resp.json()).then(resp=>{
                this.buscarMateria();
            });
        }
    },
    created:function(){
        this.buscarMateria();
    }
});
