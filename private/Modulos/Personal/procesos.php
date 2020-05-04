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

            if ( empty( $this->datos['Descripcion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo del empleado';

            }

            if ( empty( $this->datos['Sinopsis']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del empleado';

            }

            if ( empty( $this->datos['Genero']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del empleado';

            }
          

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_personal();
            }
            else{
                $this->modificarPersonal();
            }


        }

        private function almacenar_personal(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO peliculas (Descripcion, Sinopsis, Genero, Duracion ) VALUES("'.$this->datos['Descripcion'].'", "'.$this->datos['Sinopsis'].'", "'.$this->datos['Genero'].'", "'.$this->datos['Duracion'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarPersonal($valor=''){
            $this->db->consultas('SELECT * FROM peliculas WHERE peliculas.Descripcion OR  peliculas.Genero LIKE "%'.$valor.'%" ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarPersonal($idPersonal=''){
            $this->db->consultas('DELETE FROM peliculas WHERE Id_Pelicula = '. $idPersonal);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarPersonal(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE Peliculas SET Descripcion = "'.$this->datos['Descripcion'].'", Sinopsis = "'.$this->datos['Sinopsis'].'", Genero = "'.$this->datos['Genero'].'", Duracion = "'.$this->datos['Duracion'].'" WHERE Id_Pelicula = '. $this->datos['Id_Pelicula']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>