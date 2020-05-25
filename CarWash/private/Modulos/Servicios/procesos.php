<?php
 
    include('../../Config/Config.php');

    $TipoServicio = new TipoServicio($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $TipoServicio->$proceso($_GET['Servicio']);
 
    print_r(json_encode($TipoServicio->respuesta));


    class TipoServicio{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($TipoServicio){

            $this->datos = json_decode($TipoServicio, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            
            if ( empty( $this->datos['Servicio']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del servicio';

            }

            if ( empty( $this->datos['Costo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el costo del servicio';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_TipoServicio();
            }
            else{
                $this->modificarTipoServicio();
            }


        }

        private function almacenar_TipoServicio(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO TipoServicio (Servicio, Costo) VALUES("'.$this->datos['Servicio'].'", "'.$this->datos['Costo'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarTipoServicios($valor=''){
            $this->db->consultas('SELECT * FROM TipoServicio WHERE TipoServicio.Servicio LIKE "%'.$valor.'%" ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarTipoServicios($idTipoServicio=''){
            $this->db->consultas('DELETE FROM TipoServicio WHERE Id_TipoServicio = '. $idTipoServicio);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarTipoServicio(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE TipoServicio SET Servicio = "'.$this->datos['Servicio'].'", Costo = '.$this->datos['Costo']. ' WHERE Id_TipoServicio = '.$this->datos['Id_TipoServicio']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>