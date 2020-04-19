<?php
 
    include('../../Config/Config.php');

    $AgregarServicios = new AgregarServicios($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $AgregarServicios->$proceso($_GET['AgregarServicio']);
 
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


            if ( empty( $this->datos['Cliente']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del Cliente';

            }

            if ( empty( $this->datos['Tipo_Servicio']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el tipo de servicio';

            }
            if ( empty( $this->datos['Fecha']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese una fecha';

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

                    $this->db->consultas('INSERT INTO Servicios (Id_Clientes, Id_TipoServicio, Fecha) VALUES('.$this->datos['Cliente'].', '.$this->datos['Tipo_Servicio'].', "'.$this->datos['Fecha'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarAgregarServicios($valor=''){
            $this->db->consultas('SELECT Servicios.Id_servicios, Clientes.Nombre, TipoServicio.Servicio, Servicios.Fecha FROM Servicios,Clientes,TipoServicio WHERE Clientes.Id_Clientes = Servicios.Id_Clientes AND Servicios.Id_TipoServicio = TipoServicio.Id_TipoServicio AND Clientes.Nombre LIKE "%'.$valor.'%"');
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
            $this->db->consultas('DELETE FROM Servicios WHERE Id_servicios = '. $idAgregarServicios);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarAgregarServicios(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Servicios SET Id_Clientes = "'.$this->datos['Cliente'].'", Id_TipoServicio = "'.$this->datos['Tipo_Servicio'].'", Fecha = "'.$this->datos['Fecha'].'" WHERE Id_servicios = '.$this->datos['idAgregarServicios']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>