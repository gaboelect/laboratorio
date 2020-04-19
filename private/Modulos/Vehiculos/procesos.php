<?php
 
    include('../../Config/Config.php');

    $Vehiculos = new Vehiculos($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Vehiculos->$proceso($_GET['Vehiculos']);
 
    print_r(json_encode($Vehiculos->respuesta));


    class Vehiculos{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Vehiculos){

            $this->datos = json_decode($Vehiculos, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['Cliente']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el cliente';

            }

            if ( empty( $this->datos['Placa']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la placa del vehiculo';

            }

            if ( empty( $this->datos['Tipo_Vehiculo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el tipo del vehiculo';

            }
            if ( empty( $this->datos['Marca']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la marca del vehiculo';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Vehiculos();
            }
            else{
                $this->modificarVehiculos();
            }


        }

        private function almacenar_Vehiculos(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Vehiculos(Id_Clientes, Placa, Id_TipoVehiculo, Marca) VALUES ('.$this->datos['Cliente'].', "'.$this->datos['Placa'].'", '.$this->datos['Tipo_Vehiculo'].', "'.$this->datos['Marca'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarVehiculos($valor=''){
            $this->db->consultas('SELECT Vehiculos.Id_Vehiculos,Clientes.Nombre, Vehiculos.Placa, TipoVehiculo.TipoVehiculo, Vehiculos.Marca FROM Clientes, Vehiculos, TipoVehiculo WHERE Clientes.Id_Clientes = Vehiculos.Id_Clientes AND Vehiculos.Id_TipoVehiculo = TipoVehiculo.Id_TipoVehiculo AND (Clientes.Nombre LIKE "%'.$valor.'%") OR (Vehiculos.Placa LIKE "%'.$valor.'%") AND Clientes.Id_Clientes = Vehiculos.Id_Clientes AND Vehiculos.Id_TipoVehiculo = TipoVehiculo.Id_TipoVehiculo ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarVehiculos($idVehiculos=''){
            $this->db->consultas('DELETE FROM Vehiculos WHERE Id_Vehiculos = '. $idVehiculos);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarVehiculos(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Vehiculos SET Id_Clientes = "'.$this->datos['Cliente'].'", Placa = "'.$this->datos['Placa'].'", Id_TipoVehiculo = "'.$this->datos['Tipo_Vehiculo'].'", Marca = "'.$this->datos['Marca'].'" WHERE Vehiculos.Id_Vehiculos = '. $this->datos['idVehiculos']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>