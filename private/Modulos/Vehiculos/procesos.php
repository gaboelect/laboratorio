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

            if ( empty( $this->datos['Descripcion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el tipo del vehiculo';

            }
            if ( empty( $this->datos['FechaPres']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la marca del vehiculo';

            }


            if ( empty( $this->datos['FechaDev']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la marca del vehiculo';

            }

            
            if ( empty( $this->datos['Valor']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la placa del vehiculo';

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

                    $this->db->consultas('INSERT INTO alquiler (Id_Clientes, Id_Pelicula, FechaPres , FechaDev, Valor  ) VALUES ('.$this->datos['Cliente'].', "'.$this->datos['Descripcion'].'", '.$this->datos['FechaPres'].', "'.$this->datos['FechaDev'].'", "'.$this->datos['Valor'].'")');
                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }else {
                    # code...
                     $this->respuesta['msg'] = 'ERORR FATAL';
                }

            }

        }
        
        public function buscarVehiculos($valor=''){
            $this->db->consultas('SELECT alquiler.*, Clientes.Nombre, peliculas.Descripcion  from alquiler
         
            inner join clientes on(clientes.Id_Clientes=alquiler.Id_Clientes)
            inner join peliculas on(peliculas.Id_Pelicula=alquiler.Id_Pelicula)
            WHERE clientes.Nombre like "%'.$valor.'%"  or 
                peliculas.Descripcion like "%' . $valor . '%" or
                alquiler.FechaPres like "%' . $valor . '%" or
                alquiler.FechaDev like "%' . $valor . '%"
            
            ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarVehiculos($idVehiculos=''){
            $this->db->consultas('DELETE FROM alquiler WHERE Id_Alquiler = '. $idVehiculos);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarVehiculos(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE alquiler SET Id_Clientes = "'.$this->datos['Cliente'].'", Descripcion = "'.$this->datos['Descripcion'].'" , FechaPres = "'.$this->datos['FechaPres'].'", FechaDev = "'.$this->datos['FechaDev'].'", Valor = "'.$this->datos['Valor'].'"  WHERE vehiculos.Id_Alquiler = '. $this->datos['id_Alquiler']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>