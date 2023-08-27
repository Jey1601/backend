import express from 'express';
import { agregarUsuario, login, obtenerDatosUsuario, obtenerOrdenes, obtenerOrdenesEnCamino, obtenerOrdenesEntregadas, obtenerOrdenesPendientes } from '../controllers/usuario.controller';


const router =express.Router();

//http://localhost:3000/usuarios/login
router.post('/login', login);

//http://localhost:3000/usuarios/:id/datos
router.get('/:id/datos',obtenerDatosUsuario);

//http://localhost:3000/usuarios
router.post('/',agregarUsuario);

//http://localhost:3000/usuarios/:id/ordenes
router.get('/:id/ordenes',obtenerOrdenes);

//http://localhost:3000/usuarios/:id/ordenes/pendientes
router.get('/:id/ordenes/pendientes',obtenerOrdenesPendientes);

//http://localhost:3000/usuarios/:id/ordenes/entregadas
router.get('/:id/ordenes/entregadas',obtenerOrdenesEntregadas);

//http://localhost:3000/usuarios/:id/ordenes/encamino
router.get('/:id/ordenes/encamino',obtenerOrdenesEnCamino);


export default router;