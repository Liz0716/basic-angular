-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-10-2024 a las 06:51:49
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `usuario` varchar(20) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `calle_numero` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` varchar(45) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT NULL COMMENT '0- inactivo 1- activo\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id`, `nombre`, `apellido_paterno`, `apellido_materno`, `correo`, `usuario`, `password`, `telefono`, `calle_numero`, `fecha_nacimiento`, `estatus`) VALUES
(8, 'Liz', 'Chavarria ', 'Guerrero', 'lizbeth@gmail.com', 'lizchg', '123456', '4152334212', 'San Miguel de allende, centro #12', '1989-09-24', 1),
(9, 'Juan', 'Perez', 'Soto', 'juan@gmail', 'juanito', '12345', '4152331212', 'San Miguel de allende, centro', '2000-09-29', 1),
(10, 'Fernando', 'Lopez', 'Soto', 'fer@gmail', 'fer', '2468', '415772231', 'San Miguel de allende', '2000-10-09', NULL),
(12, 'Jimena', 'Rodriguez', 'Ruiz', 'jime@gmail', 'jime123', '98765', '4152334344', 'San Miguel de Allende ', '2017-08-10', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
