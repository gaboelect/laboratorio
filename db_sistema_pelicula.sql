-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2020 a las 01:03:46
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_pelicula`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE `alquiler` (
  `Id_Alquiler` int(11) NOT NULL,
  `Id_Clientes` int(11) NOT NULL,
  `Id_Pelicula` int(11) NOT NULL,
  `FechaPres` date NOT NULL,
  `FechaDev` date NOT NULL,
  `Valor` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`Id_Alquiler`, `Id_Clientes`, `Id_Pelicula`, `FechaPres`, `FechaDev`, `Valor`) VALUES
(17, 1, 1, '2020-05-01', '2020-05-25', '$40'),
(18, 3, 4, '2020-05-02', '2020-05-26', '$60'),
(19, 4, 5, '2020-05-03', '2020-05-27', '$30'),
(20, 5, 6, '2020-05-05', '2020-05-29', '$22'),
(21, 11, 7, '2020-05-08', '2020-05-31', '$32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Id_Clientes` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Dui` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id_Clientes`, `Nombre`, `Direccion`, `Telefono`, `Dui`) VALUES
(1, 'LUIS HENRRIQUE HERNANDEZ', 'USULUTAN', '0909-0909', '32457895-7'),
(3, 'JUAN GABRIEL HERNANDEZ MOISES', 'JIQUILISCO', '9900-0099', '04785986-8'),
(4, 'CARLOS MANUEL ORTEZ PINEDA', 'SAN MIGUEL', '7895-8798', '11111111-2'),
(5, 'LUIS MIGUEL CAMPOS MARTINEZ', 'SAN SALVADOR', '7894-5685', '45856245-9'),
(9, 'MIGUEL ANGEL JIMENE CRUZ', 'ZACATECOLUCA', '01458795-8', '4568045262'),
(10, 'Julio César jimenez cruz', 'USULUTAN', '7894-5789', '78958548-5'),
(11, 'Kevin Ernesto saravia Vasquez', 'USULUTAN', '5678-8695', '45887744-5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `Id_Pelicula` int(11) NOT NULL,
  `Descripcion` varchar(150) NOT NULL,
  `Sinopsis` varchar(200) NOT NULL,
  `Genero` varchar(100) NOT NULL,
  `Duracion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`Id_Pelicula`, `Descripcion`, `Sinopsis`, `Genero`, `Duracion`) VALUES
(1, 'BUSCANDO A NEMO', 'NEMO SE PIERDE AYUDA A ENCONTRARLO NO SEAS MALITO', 'LAMENTO', '3'),
(4, 'SE ME PERDIO LA CARTERA', 'COMO SOBREVIVIR SI SE TE PIERDE EL DINERO EN TU CARTERA', 'SUPERVIVENCIA', '2'),
(5, 'LA ROSA DE GUADALUPE', 'CASOS DE LA VIDA', 'SUSPENSO', '1'),
(6, 'GUERRA DE ROBOTS', 'CONSTRUYE ROBOT PARA PELEAR', 'ACCION', '2'),
(7, 'EL SECUESTRO DEL PECHE', 'MISION PARA EFECTUAR RESCATE', 'SUSPENSO', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`Id_Alquiler`),
  ADD KEY `Id_Clientes` (`Id_Clientes`),
  ADD KEY `Id_Pelicula` (`Id_Pelicula`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id_Clientes`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`Id_Pelicula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  MODIFY `Id_Alquiler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `Id_Clientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `Id_Pelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `Id_Clientes` FOREIGN KEY (`Id_Clientes`) REFERENCES `clientes` (`Id_Clientes`),
  ADD CONSTRAINT `Id_Pelicula` FOREIGN KEY (`Id_Pelicula`) REFERENCES `peliculas` (`Id_Pelicula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
