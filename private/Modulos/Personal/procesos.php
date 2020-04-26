<?php
 
    include('../../Config/Config.php');

    $personal = new personal($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $personal->$proceso($_GET['personal']);
 
    print_r(json_encode($personal->respuesta));


    class personal{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($personal){

            $this->datos = json_decode($personal, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['Codigo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo del empleado';

            }

            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del empleado';

            }

            if ( empty( $this->datos['Direccion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del empleado';

            }
            if ( empty( $this->datos['Cargo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el cargo del empleado';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_personal();
            }
            else if($this->datos['accion'] == 'login'){
                $this->buscarUsuarios();
            } 
            else {
                $this->modificarPersonal();
            }


        }

        public function buscarUsuarios(){

            $this->db->consultas('SELECT * FROM Personal WHERE Usuario = "'.$this->datos['Usuario'].'" AND Password = "'. $this->datos['Password'].'"');
            $UsuarioActual = $this->db->obtener_data();
            $cont = count($UsuarioActual);
            $imprimirUsuario = [];
            $imprimirNombreUsuario = [];
            $imprimirPassUsuario = [];
            $imprimirDirecUsuario = [];
            $imprimirCodUsuario = [];
            $imprimirTelUsuario = [];
            $imprimirIdUsuario = [];
            $imprimirCargoUsuario = [];

            for ($i=0; $i < count($UsuarioActual); $i++) { 
                $imprimirUsuario[] = $UsuarioActual[$i]['Usuario'];
                $imprimirIdUsuario[] = $UsuarioActual[$i]['Id_Personal'];
                $imprimirNombreUsuario[] = $UsuarioActual[$i]['Nombre'];
                $imprimirPassUsuario[] = $UsuarioActual[$i]['Password'];
                $imprimirTelUsuario[] = $UsuarioActual[$i]['Telefono'];
                $imprimirCargoUsuario[] = $UsuarioActual[$i]['Cargo'];
                $imprimirDirecUsuario[] = $UsuarioActual[$i]['Direccion'];
                $imprimirCodUsuario[] = $UsuarioActual[$i]['Codigo'];
            }
            // echo json_encode($imprimirAgregarServicios);

            return $this->respuesta = ['usuario'=>$imprimirUsuario, 'nombre'=>$imprimirNombreUsuario, 'id_personal'=>$imprimirIdUsuario, 'password'=>$imprimirPassUsuario, 'codigo'=>$imprimirCodUsuario, 'telefono'=>$imprimirTelUsuario, 'cargo'=>$imprimirCargoUsuario, 'direccion'=>$imprimirDirecUsuario, 'cont'=>$cont];//array de php en v7+
        }

        private function almacenar_personal(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Personal (Codigo, Nombre, Direccion, Telefono, Cargo, Usuario, Password) VALUES("'.$this->datos['Codigo'].'", "'.$this->datos['Nombre'].'", "'.$this->datos['Direccion'].'", "'.$this->datos['Telefono'].'", "'.$this->datos['Cargo'].'", "'.$this->datos['Usuario'].'", "'.$this->datos['Password'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        
        public function buscarPersonal($valor=''){
            $this->db->consultas('SELECT * FROM Personal WHERE Personal.Codigo LIKE "%'.$valor.'%" OR Personal.Nombre LIKE "%'.$valor.'%" ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarPersonal($idPersonal=''){
            $this->db->consultas('DELETE FROM Personal WHERE Id_Personal = '. $idPersonal);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarPersonal(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Personal SET Codigo = "'.$this->datos['Codigo'].'", Nombre = "'.$this->datos['Nombre'].'", Direccion = "'.$this->datos['Direccion'].'", Telefono = "'.$this->datos['Telefono'].'", Cargo = "'.$this->datos['Cargo'].'", Usuario = "'.$this->datos['Usuario'].'", Password = "'.$this->datos['Password'].'" WHERE Id_Personal = '. $this->datos['Id_Personal']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

        public function traer_periodos_alumnos(){
            $this->db->consultas('SELECT * FROM Personal');
            $Clientes = $this->db->obtener_data();
            $imprimirClientes = [];
            $imprimirClientesIDs = [];
            for ($i=0; $i < count($Clientes); $i++) { 
                $imprimirClientes[] = $Clientes[$i]['Nombre'];
                $imprimirClientesIDs[] = $Clientes[$i]['Id_Personal'];
            }
            // echo json_encode($imprimirAgregarServicios);

            return $this->respuesta = ['Clientes'=>$imprimirClientes, 'ClientesID'=>$imprimirClientesIDs ];//array de php en v7+
        }

    }

?>