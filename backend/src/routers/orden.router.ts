import express from 'express';
import { actualizarCantidad, actualizarOrden, agregarProducto, obtenerOrden, obtenerOrdenes, agregarOrden, obtenerOrdenesPendientes, obtenerOrdenesSinEntregar, eliminarOrden } from '../controllers/orden.controller';
import { obtenerOrdenesTomadas } from '../controllers/motorista.controller';


const router =express.Router();


//http://localhost:3000/ordenes
router.get('/',obtenerOrdenes);

//http://localhost:3000/ordenes
router.post('/',agregarOrden);




//http://localhost:3000/ordenes/pendientes
router.get('/pendientes',obtenerOrdenesPendientes);

//http://localhost:3000/ordenes/sinentregar
router.get('/sinentregar',obtenerOrdenesSinEntregar);

//http://localhost:3000/ordenes/:id
router.get('/:id',obtenerOrden);

//http://localhost:3000/ordenes/:id
router.delete('/:id', eliminarOrden);

//http://localhost:3000/ordenes/:id/productos
router.put('/:id/productos',actualizarCantidad); 

//http://localhost:3000/ordenes/:id
router.put('/:id',actualizarOrden);

//http://localhost:3000/ordenes/:id/productos
router.post('/:id/productos',agregarProducto);





export default router;