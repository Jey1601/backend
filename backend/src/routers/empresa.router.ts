import express from 'express';
import { obtenerEmpresas, obtenerEmpresa, obtenerProductos, actualizarEmpresa, eliminarProducto, agregarProducto } from '../controllers/empresa.controller';

const router =express.Router();

//http://localhost:3000/empresas
router.get('/',obtenerEmpresas);

//http://localhost:3000/empresas/:id
router.get('/:id',obtenerEmpresa);

//http://localhost:3000/motoristas/:id/productos
router.get('/:id/productos',obtenerProductos);

//http://localhost:3000/empresas/:id
router.put('/:id',actualizarEmpresa);

//http://localhost:3000/empresas/:id/productos
router.post('/:id/productos',agregarProducto);

//http://localhost:3000/empresas/:empresaId/productos/:productoId
router.delete('/:empresaId/productos/:productoId',eliminarProducto);

export default router;