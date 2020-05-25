<?php
 
    include('../../Config/Config.php');

    $Estadistica = new Estadistica($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Estadistica->$proceso();
    
 
    print_r(json_encode($Estadistica->respuesta));


    class Estadistica{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }


        public function traer_estadisticaColum(){
            $this->db->consultas('SELECT TipoServicio.Servicio, COUNT(Servicios.`Id_TipoServicio`) AS Cantidad FROM Servicios, TipoServicio WHERE Servicios.Id_TipoServicio = TipoServicio.Id_TipoServicio GROUP BY TipoServicio.Servicio');
            $Servicios = $this->db->obtener_data();

            $imprimirServicios = [];

            for ($i=0; $i < count($Servicios); $i++) { 
                $imprimirServicios[] = [$Servicios[$i]['Servicio'], intval($Servicios[$i]['Cantidad']) , "#76A7FA"];
            }

            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = $imprimirServicios ;//array de php en v7+
        }

        public function traer_estadisticaPie(){
            $this->db->consultas('SELECT TipoServicio.Servicio, SUM(TipoServicio.Costo) AS Cantidad FROM Servicios, TipoServicio WHERE Servicios.Id_TipoServicio = TipoServicio.Id_TipoServicio GROUP BY TipoServicio.Servicio ');
            $Servicios = $this->db->obtener_data();

            $imprimirServicios = [];

            for ($i=0; $i < count($Servicios); $i++) { 
                $imprimirServicios[] = [$Servicios[$i]['Servicio'], intval($Servicios[$i]['Cantidad']) ];
            }

            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = $imprimirServicios ;//array de php en v7+
        }

    }

?>