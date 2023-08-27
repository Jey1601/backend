import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AdministradorSchema } from '../models/administrador.schema';



export const login = async (req: Request, res: Response) => {

    const administrador = await AdministradorSchema.findOne({ usuario: req.body.usuario, contrasena: req.body.contrasena }, { contrasena: false });
    if (administrador) {
        res.send({ status: true, message: 'Login correcto', administrador });
    }
    else
        res.send({ status: false, message: 'Login incorrecto' });
    res.end();
};