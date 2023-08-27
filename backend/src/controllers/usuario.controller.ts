import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UsuarioSchema } from '../models/usuario.schema';


export const login = async (req: Request, res: Response) => {

    const usuario = await UsuarioSchema.findOne({ email: req.body.email, contrasena: req.body.contrasena }, { contrasena: false });
    if (usuario) {
        res.send({ status: true, message: 'Login correcto', usuario });
    }
    else
        res.send({ status: false, message: 'Login incorrecto' });
    res.end();
};

export const obtenerDatosUsuario = async (req: Request, res: Response) => {

    const usuario = await UsuarioSchema.findOne({ _id:req.params.id }, { nombre:true, apellido:true, telefono:true,email:true});
    if (usuario) {
        res.send({ status: true, message: 'Datos Obtenidos con exito', usuario });
    }
    else
        res.send({ status: false, message: 'No se pudieron obtener los datos' });
    res.end();
};

export const agregarUsuario = async (req: Request, res: Response) => {

    try {
        const usuario = new UsuarioSchema(req.body);
        const saveResponse = await usuario.save();
        res.send({ status: true, message: "El usuario ha sido exitosamente guardado", usuario: saveResponse });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const obtenerOrdenes = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await UsuarioSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idUsuario',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(usuarioId),
                },
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        // res.json(result);
        res.send({status:true, message:"Ordenes obtenidas con exito", detalleOrdenes:result, usuarioId});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};

export const obtenerOrdenesPendientes = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await UsuarioSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idUsuario',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(usuarioId),
                },
            },{
                $unwind: "$detallesOrdenes" // Descomponer el arreglo detallesOrdenes
            },
            {
                $match: {
                    "detallesOrdenes.estado": "pendiente" // Filtrar por estado pendiente
                }
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        // res.json(result);
        res.send({status:true, message:"Ordenes obtenidas con exito", detalleOrdenes:result, usuarioId});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};

export const obtenerOrdenesEntregadas = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await UsuarioSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idUsuario',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(usuarioId),
                },
            },{
                $unwind: "$detallesOrdenes" // Descomponer el arreglo detallesOrdenes
            },
            {
                $match: {
                    "detallesOrdenes.estado": "entregada" // Filtrar por estado pendiente
                }
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        // res.json(result);
        res.send({status:true, message:"Ordenes obtenidas con exito", detalleOrdenes:result, usuarioId});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};

export const obtenerOrdenesEnCamino = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await UsuarioSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idUsuario',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(usuarioId),
                },
            },{
                $unwind: "$detallesOrdenes" // Descomponer el arreglo detallesOrdenes
            },
            {
                $match: {
                    "detallesOrdenes.estado": "encamino" // Filtrar por estado pendiente
                }
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        // res.json(result);
        res.send({status:true, message:"Ordenes obtenidas con exito", detalleOrdenes:result, usuarioId});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};