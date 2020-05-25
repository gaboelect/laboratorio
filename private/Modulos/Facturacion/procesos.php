<?php
 
    include('../../Config/Config.php');

    $Facturacion = new Facturacion($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    if (isset( $_GET['Fecha'] ) && strlen( $_GET['Fecha'] ) > 0) {
        $Facturacion->$proceso($_GET['Facturacion'], $_GET['Fecha']);
    }
    else {
        $Facturacion->$proceso($_GET['Facturacion']);
    }

    
 
    print_r(json_encode($Facturacion->respuesta));


    class Facturacion{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Facturacion){

            $this->datos = json_decode($Facturacion, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            
            if ( empty( $this->datos['Trabajador']) ) {
                
                $this->respuesta['msg'] = 'Por favor seleccione un empleado';

            }

            if ( empty( $this->datos['tiempo']) ) {
                
                $this->respuesta['msg'] = 'Error con la fecha';

            }

            if ( empty( $this->datos['Cliente']) ) {
                
                $this->respuesta['msg'] = 'Por favor seleccione un cliente';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Facturacion();
            }
            else{
                $this->modificarFacturacion();
            }


        }

        

        private function almacenar_Facturacion(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Facturacion (Id_personal, Id_Clientes  , Fecha_Hora_E, ValorPagado ) VALUES("'.$this->datos['Trabajador'].'", "'.$this->datos['Cliente'].'", "'.$this->datos['tiempo'].'", 0.00)');

                    $this->respuesta['msg'] = 'Factrura creada correctamente';
                }

            }

        }
        
        public function buscarFacturacion($valor='', $fecha=''){
            $this->db->consultas('SELECT Facturacion.Id_Facturacion, Personal.Nombre As Personal, Clientes.Nombre As Cliente, Facturacion.Fecha_Hora_E, Facturacion.Fecha_Hora_S, Facturacion.ValorPagado  FROM Facturacion, Personal, Clientes WHERE Facturacion.Id_personal = Personal.Id_Personal AND Facturacion.Id_Clientes = Clientes.Id_Clientes AND Clientes.Nombre LIKE "%'.$valor.'%" AND Facturacion.Id_personal = Personal.Id_Personal AND Facturacion.Id_Clientes = Clientes.Id_Clientes AND Facturacion.Fecha_Hora_E LIKE "%'.$fecha.'%" AND Facturacion.Fecha_Hora_S IS NULL' );
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarFacturacion($idFacturacion=''){
            $this->db->consultas('DELETE FROM Facturacion WHERE Id_Facturacion = '. $idFacturacion);
            $this->db->consultas('DELETE FROM Servicios WHERE Servicios.Id_Factura = '. $idFacturacion);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function Salida($idFacturacion, $fecha){
            $this->db->consultas('UPDATE Facturacion SET Fecha_Hora_S = "'.$fecha.'" WHERE Facturacion.Id_Facturacion = '.$idFacturacion);
            $this->respuesta['msg'] = 'Pago Agregado Correctamente el: '.$fecha;
        }

        public function modificarFacturacion(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Facturacion SET Servicio = "'.$this->datos['Servicio'].'", Costo = '.$this->datos['Costo']. ' WHERE Id_Facturacion = '.$this->datos['Id_Facturacion']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>