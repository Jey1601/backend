import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MotoristaSchema } from '../models/motorista.schema';
import { Motorista } from '../models/motorista.model';


export const login = async (req: Request, res: Response) => {

    const usuario = await MotoristaSchema.findOne({ email: req.body.email, contrasena: req.body.contrasena }, { contrasena: false });
    if (usuario) {
        res.send({ status: true, message: 'Login correcto', usuario });
    }
    else
        res.send({ status: false, message: 'Login incorrecto' });
    res.end();
};


export const agregarMotorista = async (req: Request, res: Response) => {

    try {
        const usuario = new MotoristaSchema(req.body);
        const saveResponse = await usuario.save();
        res.send({ status: true, message: "El usuario ha sido exitosamente guardado", usuario: saveResponse });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const obtenerMotoristas = async (req: Request, res: Response) => {
    try {
        const motoristas: Array<Motorista> = await MotoristaSchema.find().select('-contrasena');
        res.send({ status: true, message: "Motoristas obtenidos con exito", motoristas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}
export const obtenerMotorista = async (req: Request, res: Response) => {
    try {
        const motorista = await MotoristaSchema.findOne({_id:req.params.id}).select('-contrasena');
        res.send({ status: true, message: "Motorista obtenido con exito", motorista });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

export const obtenerOrdenes = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await MotoristaSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idMotorista',
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
        res.send({ status: true, message: "Ordenes obtenidas con exito", detalleOrdenes: result, usuarioId });
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};

/*export const obtenerOrdenesPendientes = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await MotoristaSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idMotorista',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(usuarioId),
                },
            }, {
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
        res.send({ status: true, message: "Ordenes obtenidas con exito", detalleOrdenes: result, usuarioId });
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};*/


export const obtenerOrdenesEntregadas = async (req: Request, res: Response) => {

    try {
        const usuarioId = new mongoose.Types.ObjectId(req.params.id);

        const result = await MotoristaSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idMotorista',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: usuarioId,
                },
            },
            {
                $unwind: "$detallesOrdenes"
            },
            {
                $match: {
                    "detallesOrdenes.estado": "eneldestino"
                }
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        const detalleOrdenes = result.map(item => item.detallesOrdenes); // Extraer los detalles de las órdenes

        // Unir los detalles de órdenes descompuestos en un solo arreglo
        const ordenesUnidas = detalleOrdenes.reduce((merged, detalles) => {
            merged.push(detalles);
            return merged;
        }, []);

        res.send({ status: true, message: "Ordenes obtenidas con exito", detalleOrdenes: ordenesUnidas, usuarioId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};

export const obtenerOrdenesTomadas = async (req: Request, res: Response) => {
    try {
        const motoristaId = new mongoose.Types.ObjectId(req.params.id);

        const result = await MotoristaSchema.aggregate([
            {
                $lookup: {
                    from: 'ordenes',
                    localField: '_id',
                    foreignField: 'idMotorista',
                    as: 'detallesOrdenes',
                },
            },
            {
                $match: {
                    _id: motoristaId,
                },
            },
            {
                $unwind: "$detallesOrdenes"
            },
            {
                $match: {
                    "detallesOrdenes.estado": { $in: ["tomada","encamino", "enelorigen"] }
                }
            },
            {
                $project: {
                    detallesOrdenes: true,
                    _id: false,
                },
            },
        ]).exec();

        const mergedOrdenes = result.map(item => item.detallesOrdenes); // Extraer los detalles de las órdenes

        // Unir los detalles de órdenes descompuestos en un solo arreglo
        const detalleOrdenes = mergedOrdenes.reduce((merged, detalles) => merged.concat(detalles), []);

        res.send({ status: true, message: "Ordenes obtenidas con exito", detalleOrdenes, motoristaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
};
export const eliminarMotorista = async (req: Request, res: Response) => {
    try {
        const removeResult = await MotoristaSchema.deleteOne({ _id: req.params.id });
        res.send({ message: 'Registro eliminado', removeResult });
    } catch (error) {
        console.error('Error eliminando el Pokémon:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el Pokémon' });
    }
};