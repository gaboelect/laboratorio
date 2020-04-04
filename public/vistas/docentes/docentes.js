var appdocente = new Vue({
  el:'#frm-docentes',
  data:{
      docente:{
          idDocente : 0,
          accion    : 'nuevo',
          codigo    : '',
          nombre    : '',
          nit       : '',
          direccion : '',
          telefono  : '',
          msg       : ''
      }
  },
  methods:{
      guardarDocente:function(){
          fetch(`private/Modulos/docentes/procesos.php?proceso=recibirDatos&docente=${JSON.stringify(this.docente)}`).then( resp=>resp.json() ).then(resp=>{
              this.docente.msg = resp.msg;
              this.docente.idDocente = 0;
              this.docente.codigo = '';
              this.docente.nombre = '';
              this.docente.nit = '';
              this.docente.direccion = '';
              this.docente.telefono = '';
              this.docente.accion = 'nuevo';
              appBuscarDocente.buscarDocente();
          });
      }
  }
});