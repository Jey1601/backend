import express from 'express';
import { actualizarProducto, agregarProducto, eliminarProducto, obtenerProducto } from '../controllers/producto.controller';



const router =express.Router();

//http://localhost:3000/productos
router.post('/',agregarProducto);

//http://localhost:3000/productos/:id
router.get('/:id',obtenerProducto);


//http://localhost:3000/productos/:id
router.put('/:id',actualizarProducto);

//http://localhost:3000/productos/:id
router.delete('/:id', eliminarProducto);
export default router;