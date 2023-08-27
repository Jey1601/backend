import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProductoSchema } from '../models/producto.schema';


export const obtenerProducto = async (req: Request, res: Response) => {

    try {
        const producto = await ProductoSchema.findOne({ _id: req.params.id });
        if (producto) {
            res.send({ status: true, message: 'Producto encontrado', producto });
        }
        else
            res.send({ status: false, message: 'Producto no encontrado' });
        res.end();
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};


export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const updateResponse = await ProductoSchema.updateOne({ _id: req.params.id }, req.body);
        res.send({ message: 'Registro actualizado', updateResponse }); //se editan solo los campos que se envian?
    } catch (error) {
        console.error(error);
        res.send({ message: 'Hubo un error al actualizar', error });
    }
};


export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const removeResult = await ProductoSchema.deleteOne({ _id: req.params.id });
        res.send({ message: 'Registro eliminado', removeResult });
    } catch (error) {
        console.error('Error eliminando el producto:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el producto' });
    }
};


export const agregarProducto = async (req: Request, res: Response) => {
    
    
    const objecto={
    nombre:req.body.nombre,
    descripcion:req.body.descripcion,
    precio:req.body.precio,
    imagen: req.body.imagen,
    cantidad:0,
    empresa:req.body.empresa

    }
    try {
        const producto = new ProductoSchema(objecto);
        const saveResponse = await producto.save();
        res.send({ status: true, message: "El producto ha sido exitosamente guardado", producto });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};