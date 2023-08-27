import express from 'express';
import { obtenerCategoria, obtenerCategorias } from '../controllers/categoria.controller';


const router =express.Router();

//http://localhost:3000/categorias
router.get('/',obtenerCategorias);

//http://localhost:3000/categorias/:id
router.get('/:id',obtenerCategoria);


export default router;