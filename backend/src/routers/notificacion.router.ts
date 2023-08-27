import express from 'express';
import { actualizarNotificacion, agregarNotificacion, eliminarNotificacion, obtenerNotificacion, obtenerNotificaciones } from '../controllers/notificacion.controller';

const router =express.Router();

//http://localhost:3000/notificaciones
router.get('/',obtenerNotificaciones);

//http://localhost:3000/notificaciones/:id
router.get('/:id',obtenerNotificacion);


//http://localhost:3000/notificaciones
router.post('/',agregarNotificacion);

//http://localhost:3000/notificaciones/:id
router.put('/:id',actualizarNotificacion);

//http://localhost:3000/notificaciones/:id
router.delete('/:id', eliminarNotificacion);

export default router;