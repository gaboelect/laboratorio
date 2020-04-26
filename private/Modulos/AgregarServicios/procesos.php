<?php
 
    include('../../Config/Config.php');

    $AgregarServicios = new AgregarServicios($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    if (isset( $_GET['Factura'] ) && strlen( $_GET['Factura'] ) > 0) {
        $AgregarServicios->$proceso($_GET['AgregarServicio'], $_GET['Factura'] );
    }
    else {
        $AgregarServicios->$proceso($_GET['AgregarServicio']);
    }
 
    print_r(json_encode($AgregarServicios->respuesta));


    class AgregarServicios{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($AgregarServicios){

            $this->datos = json_decode($AgregarServicios, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['Tipo_Servicio']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el tipo de servicio';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_AgregarServicios();
            }
            else{
                $this->modificarAgregarServicios();
            }


        }

        private function almacenar_AgregarServicios(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Servicios (Id_TipoServicio, Id_Factura) VALUES('.$this->datos['Tipo_Servicio'].', '.$this->datos['Factura'].')');

                    $idFactura = $this->datos['Factura'];

                    $this->AgregarTotal($idFactura);
                    
                    
                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        public function AgregarTotal($idFactura){
            $this->db->consultas('SELECT SUM(TipoServicio.Costo) As Total FROM Servicios, TipoServicio WHERE Servicios.Id_Factura = '.$idFactura.' AND Servicios.Id_TipoServicio = TipoServicio.Id_TipoServicio ');

            $Suma = $this->db->obtener_data();
            $Total = 0.00;
            for ($i=0; $i < count($Suma); $i++) {

                if ( $Suma[$i]['Total'] > 0) {
                    $Total = $Suma[$i]['Total'];
                }
                
            }

            $this->db->consultas('UPDATE Facturacion SET ValorPagado = '.$Total.' WHERE Facturacion.Id_Facturacion = '.$idFactura);

        }
        
        public function buscarAgregarServicios($valor='', $IdFactura){
            $this->db->consultas('SELECT Servicios.Id_servicios, TipoServicio.Servicio, TipoServicio.Costo FROM Servicios,TipoServicio, Facturacion WHERE Servicios.Id_TipoServicio = TipoServicio.Id_TipoServicio AND Servicios.Id_Factura = Facturacion.Id_Facturacion AND Facturacion.Id_Facturacion = '.$IdFactura.' AND TipoServicio.Servicio LIKE "%'.$valor.'%"');
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
            // echo json_encode($imprimirAgregarServicios);

            $this->db->consultas('SELECT * FROM TipoServicio');
            $Servicio = $this->db->obtener_data();

            $ImprimirServicio = [];
            $ImprimirServicioIDs = [];

            for ($i=0; $i < count($Servicio); $i++) { 
                $ImprimirServicio[] = $Servicio[$i]['Servicio'];
                $ImprimirServicioIDs[] = $Servicio[$i]['Id_TipoServicio'];
            }

            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = ['Clientes'=>$imprimirClientes, 'ClientesID'=>$imprimirClientesIDs , 'Servicio'=>$ImprimirServicio, 'ServicioID'=>$ImprimirServicioIDs];//array de php en v7+
        }

        public function eliminarAgregarServicios($idAgregarServicios=''){

            $this->db->consultas('SELECT Servicios.Id_Factura FROM Servicios WHERE Id_Servicios = '. $idAgregarServicios);

            $Factura = $this->db->obtener_data();

            $IdFactura;
            for ($i=0; $i < count($Factura); $i++) { 
                $IdFactura = $Factura[$i]['Id_Factura'];
            }

            $this->db->consultas('DELETE FROM Servicios WHERE Id_servicios = '. $idAgregarServicios);

            $this->AgregarTotal($IdFactura);

            $this->respuesta['msg'] = "Registro Eliminado Correctamente";

        }

        public function modificarAgregarServicios(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Servicios SET  Id_TipoServicio = "'.$this->datos['Tipo_Servicio'].'" WHERE Id_servicios = '.$this->datos['idAgregarServicios']);

                    $this->AgregarTotal($idFactura);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';

                }
                
            }
        }

    }

?>