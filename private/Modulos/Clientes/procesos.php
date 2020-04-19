<?php
 
    include('../../Config/Config.php');

    $Clientes = new Clientes($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Clientes->$proceso($_GET['Cliente']);
 
    print_r(json_encode($Clientes->respuesta));


    class Clientes{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Clientes){

            $this->datos = json_decode($Clientes, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del empleado';

            }

            if ( empty( $this->datos['Direccion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del empleado';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Clientes();
            }
            else{
                $this->modificarClientes();
            }


        }

        private function almacenar_Clientes(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Clientes (Nombre, Direccion, Telefono) VALUES("'.$this->datos['Nombre'].'", "'.$this->datos['Direccion'].'", "'.$this->datos['Telefono'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarClientes($valor=''){
            $this->db->consultas('SELECT * FROM Clientes WHERE Clientes.Nombre LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function traer_periodos_alumnos(){
            $this->db->consultas('SELECT * FROM Clientes');
            $Clientes = $this->db->obtener_data();
            $imprimirClientes = [];
            $imprimirClientesIDs = [];
            for ($i=0; $i < count($Clientes); $i++) { 
                $imprimirClientes[] = $Clientes[$i]['Nombre'];
                $imprimirClientesIDs[] = $Clientes[$i]['Id_Clientes'];
            }
            // echo json_encode($imprimirClientes);

            $this->db->consultas('SELECT * FROM TipoVehiculo');
            $Vehiculos = $this->db->obtener_data();

            $ImprimirVehiculos = [];
            $ImprimirVehiculosIDs = [];

            for ($i=0; $i < count($Vehiculos); $i++) { 
                $ImprimirVehiculos[] = $Vehiculos[$i]['TipoVehiculo'];
                $ImprimirVehiculosIDs[] = $Vehiculos[$i]['Id_TipoVehiculo'];
            }
            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = ['Clientes'=>$imprimirClientes, 'TipoVehiculos'=>$ImprimirVehiculos , 'IDVehiculos'=>$ImprimirVehiculosIDs, 'IDClientes'=>$imprimirClientesIDs];//array de php en v7+
        }

        public function eliminarClientes($idClientes=''){
            $this->db->consultas('DELETE FROM Clientes WHERE Id_Clientes = '. $idClientes);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarClientes(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Clientes SET Nombre = "'.$this->datos['Nombre'].'", Direccion = "'.$this->datos['Direccion'].'", Telefono = "'.$this->datos['Telefono'].'" WHERE Id_Clientes = '.$this->datos['Id_Clientes']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>