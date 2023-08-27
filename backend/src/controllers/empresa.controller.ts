import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { EmpresaSchema } from '../models/empresa.schema';
import { Empresa } from '../models/empresa.model';


export const obtenerEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas: Array<Empresa> = await EmpresaSchema.find().select('-contrasena');
        res.send({ status: true, message: "Empresas obtenidas con exito", empresas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

export const obtenerProductos = async (req: Request, res: Response) => {

    try {
        const empresaId = new mongoose.Types.ObjectId(req.params.id);

        const result = await EmpresaSchema.aggregate([
            {
                $lookup: {
                    from: 'productos',
                    localField: 'productos',
                    foreignField: '_id',
                    as: 'detalleProductos',
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(empresaId),
                },
            },
            {
                $project: {
                    detalleProductos: true,
                    _id: false,
                },
            },
        ]).exec();

        
        res.send({ status: true, message: "Productos obtenidos con exito", detalleProductos: result});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }

};


export const obtenerEmpresa = async (req: Request, res: Response) => {

    try {
        const empresa = await EmpresaSchema.findOne({ _id: req.params.id });
        if (empresa) {
            res.send({ status: true, message: 'empresa encontrada', empresa });
        }
        else
            res.send({ status: false, message: 'empresa no encontrada' });
        res.end();
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const actualizarEmpresa = async (req: Request, res: Response) => {
    try {
        const updateResponse = await EmpresaSchema.updateOne({ _id: req.params.id }, req.body);
        res.send({ message: 'Registro actualizado', updateResponse }); //se editan solo los campos que se envian?
    } catch (error) {
        console.error(error);
        res.send({ message: 'Hubo un error al actualizar', error });
    }
};


export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const result = await EmpresaSchema.updateOne(
            { _id: req.params.empresaId },
            {
                $pull: {
                    productos: new mongoose.Types.ObjectId(req.params.productoId) 
                }
            }
        );

        res.send({ message: 'Producto eliminado', result });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Ocurrió un error', error });
    }
};


export const agregarProducto = async (req: Request, res: Response) => {
    try {
        const result = await EmpresaSchema.updateOne(
            { _id: req.params.id },
            {
                $push: {
                    productos: new mongoose.Types.ObjectId(req.body.id)
                },
            }
        );

        res.send({ message: 'Producto agregado', result });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Ocurrió un error', error });
    }
};

