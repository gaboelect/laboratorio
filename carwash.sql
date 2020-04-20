-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-04-2020 a las 20:26:40
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carwash`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Clientes`
--

CREATE TABLE `Clientes` (
  `Id_Clientes` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Clientes`
--

INSERT INTO `Clientes` (`Id_Clientes`, `Nombre`, `Direccion`, `Telefono`) VALUES
(1, 'Angeles', 'Sata Ana', '0909-0909'),
(3, 'Gorge', 'San pedro', '9900-0099');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Facturacion`
--

CREATE TABLE `Facturacion` (
  `Id_Facturacion` int(11) NOT NULL,
  `Id_Clientes` int(11) NOT NULL,
  `Id_Servicios` int(11) NOT NULL,
  `Id_TipoPago` int(11) NOT NULL,
  `Id_personal` int(11) NOT NULL,
  `Id_Vehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Personal`
--

CREATE TABLE `Personal` (
  `Id_Personal` int(11) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Cargo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Personal`
--

INSERT INTO `Personal` (`Id_Personal`, `Codigo`, `Nombre`, `Direccion`, `Telefono`, `Cargo`) VALUES
(1, 'EMPLE098976', 'BENITO', 'SAN GORGE', '8978-0989', 'Mecanico'),
(4, 'EMPLE095678', 'JUAN', 'SAN SALVADOR', '7780-9009', 'Lavador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Servicios`
--

CREATE TABLE `Servicios` (
  `Id_servicios` int(11) NOT NULL,
  `Id_Clientes` int(11) NOT NULL,
  `Id_TipoServicio` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Servicios`
--

INSERT INTO `Servicios` (`Id_servicios`, `Id_Clientes`, `Id_TipoServicio`, `Fecha`) VALUES
(1, 1, 1, '2020-04-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TipoPago`
--

CREATE TABLE `TipoPago` (
  `Id_TipoPago` int(11) NOT NULL,
  `Pago` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `TipoPago`
--

INSERT INTO `TipoPago` (`Id_TipoPago`, `Pago`) VALUES
(1, 'Credito'),
(2, 'Contado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TipoServicio`
--

CREATE TABLE `TipoServicio` (
  `Id_TipoServicio` int(11) NOT NULL,
  `Servicio` varchar(200) NOT NULL,
  `Costo` decimal(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `TipoServicio`
--

INSERT INTO `TipoServicio` (`Id_TipoServicio`, `Servicio`, `Costo`) VALUES
(1, 'Lavados', '3.50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TipoVehiculo`
--

CREATE TABLE `TipoVehiculo` (
  `Id_TipoVehiculo` int(11) NOT NULL,
  `TipoVehiculo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `TipoVehiculo`
--

INSERT INTO `TipoVehiculo` (`Id_TipoVehiculo`, `TipoVehiculo`) VALUES
(1, 'AUTOMOVIL'),
(2, 'MOTOCICLETA'),
(3, 'MINIVAN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Vehiculos`
--

CREATE TABLE `Vehiculos` (
  `Id_Vehiculos` int(11) NOT NULL,
  `Id_Clientes` int(11) NOT NULL,
  `Placa` varchar(10) NOT NULL,
  `Id_TipoVehiculo` int(11) NOT NULL,
  `Marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Vehiculos`
--

INSERT INTO `Vehiculos` (`Id_Vehiculos`, `Id_Clientes`, `Placa`, `Id_TipoVehiculo`, `Marca`) VALUES
(1, 3, 'P9098-0990', 2, 'KIA');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`Id_Clientes`);

--
-- Indices de la tabla `Facturacion`
--
ALTER TABLE `Facturacion`
  ADD PRIMARY KEY (`Id_Facturacion`);

--
-- Indices de la tabla `Personal`
--
ALTER TABLE `Personal`
  ADD PRIMARY KEY (`Id_Personal`);

--
-- Indices de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  ADD PRIMARY KEY (`Id_servicios`);

--
-- Indices de la tabla `TipoPago`
--
ALTER TABLE `TipoPago`
  ADD PRIMARY KEY (`Id_TipoPago`);

--
-- Indices de la tabla `TipoServicio`
--
ALTER TABLE `TipoServicio`
  ADD PRIMARY KEY (`Id_TipoServicio`);

--
-- Indices de la tabla `TipoVehiculo`
--
ALTER TABLE `TipoVehiculo`
  ADD PRIMARY KEY (`Id_TipoVehiculo`);

--
-- Indices de la tabla `Vehiculos`
--
ALTER TABLE `Vehiculos`
  ADD PRIMARY KEY (`Id_Vehiculos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  MODIFY `Id_Clientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Facturacion`
--
ALTER TABLE `Facturacion`
  MODIFY `Id_Facturacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Personal`
--
ALTER TABLE `Personal`
  MODIFY `Id_Personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Servicios`
--
ALTER TABLE `Servicios`
  MODIFY `Id_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `TipoPago`
--
ALTER TABLE `TipoPago`
  MODIFY `Id_TipoPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `TipoServicio`
--
ALTER TABLE `TipoServicio`
  MODIFY `Id_TipoServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `TipoVehiculo`
--
ALTER TABLE `TipoVehiculo`
  MODIFY `Id_TipoVehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Vehiculos`
--
ALTER TABLE `Vehiculos`
  MODIFY `Id_Vehiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
