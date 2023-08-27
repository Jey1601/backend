import express from 'express';
import { login } from '../controllers/administrador.controller';


const router =express.Router();

//http://localhost:3000/administradores/login
router.post('/login', login);


export default router;