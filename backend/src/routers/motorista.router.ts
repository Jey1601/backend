import express from 'express';
import { agregarMotorista, login, obtenerOrdenes, obtenerOrdenesEntregadas, obtenerMotoristas, obtenerOrdenesTomadas, obtenerMotorista, eliminarMotorista} from '../controllers/motorista.controller';

const router =express.Router();



//http://localhost:3000/motoristas/login
router.post('/login', login);

//http://localhost:3000/motoristas
router.post('/',agregarMotorista);

//http://localhost:3000/motoristas
router.get('/',obtenerMotoristas);

//http://localhost:3000/motoristas/:id
router.get('/:id',obtenerMotorista);

//http://localhost:3000/motoristas/:id/ordenes
router.get('/:id/ordenes',obtenerOrdenes);

/*//http://localhost:3000/motoristas/ordenes/pendientes
router.get('/ordenes/pendientes',obtenerOrdenesPendientes);*/

//http://localhost:3000/motoristas/:id/ordenes/entregadas
router.get('/:id/ordenes/entregadas',obtenerOrdenesEntregadas);

//http://localhost:3000/motoristas/:id/ordenes/encamino
router.get('/:id/ordenes/tomadas',obtenerOrdenesTomadas);

//http://localhost:3000/motoristas/:id
router.delete('/:id', eliminarMotorista);



export default router;