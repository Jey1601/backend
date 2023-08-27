import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { OrdenSchema } from '../models/orden.schema';
import { Orden } from '../models/orden.model';
import { BaseProducto } from '../models/producto.model';

export const obtenerOrden = async (req: Request, res: Response) => {

    try {
        const orden = await OrdenSchema.findOne({ _id: req.params.id });

        if (orden) {
            res.send({ status: true, message: 'orden encontrada', orden });
        }
        else
            res.send({ status: false, message: 'orden no encontrada' });
        res.end();
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};


export const obtenerOrdenes = async (req: Request, res: Response) => {
    try {
        const ordenes: Array<Orden> = await OrdenSchema.find();
        res.send({ status: true, message: "Ordenes obtenidas con exito", ordenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

export const obtenerOrdenesPendientes = async (req: Request, res: Response) => {
    try {
        const ordenes: Array<Orden> = await OrdenSchema.find({estado:"pendiente"});
        res.send({ status: true, message: "Ordenes obtenidas con exito", ordenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}


export const obtenerOrdenesSinEntregar = async (req: Request, res: Response) => {
    try {
        const estadosDeseados = ["tomada", "encamino", "enelorigen"];
        const ordenes: Array<Orden> = await OrdenSchema.find({ estado: { $in: estadosDeseados } });
        res.send({ status: true, message: "Ordenes obtenidas con éxito", ordenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}





export const actualizarOrden = async (req: Request, res: Response) => {
    try {
        const updateResponse = await OrdenSchema.updateOne({ _id: req.params.id }, req.body);
        res.send({ message: 'Registro actualizado', updateResponse }); //se editan solo los campos que se envian?
    } catch (error) {
        console.error(error);
        res.send({ message: 'Hubo un error al actualizar', error });
    }
};


export const agregarProducto = async (req: Request, res: Response) => {
    try {
        const result = await OrdenSchema.updateOne(
            { _id: req.params.id },
            {
                $push: {
                    productos: {
                        _id: new mongoose.Types.ObjectId(req.body.id),
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        precio:req.body.precio,
                        imagen:req.body.imagen,
                        cantidad:req.body.cantidad
                    },
                },
            }
        );

        res.send({ message: 'Producto agregado', result });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Ocurrió un error', error });
    }
};


export const actualizarCantidad = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id; // ID de la orden
        const productId = new mongoose.Types.ObjectId(req.body.id);// ID del producto a actualizar
    

        const result = await OrdenSchema.updateOne(
            { "_id": orderId },
            {
                $set: {
                    'productos.$[product].cantidad': req.body.cantidad,
                    // ... otras propiedades a actualizar
                },
            },
            {
                arrayFilters: [{ 'product._id': productId }],
            }
        );

        res.send({ message: 'Producto actualizado en la orden', result });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Ocurrió un error', error });
    }
};


export const agregarOrden = async (req: Request, res: Response) => {
    
    
    const objecto={
     
    idUsuario:new mongoose.Types.ObjectId(req.body.idUsuario),
    idMotorista:new mongoose.Types.ObjectId(req.body.idMotorista),
    estado: req.body.estado,
    productos:req.body.productos,
    ubicacion:req.body.ubicacion,
    total:req.body.total,
    cantidad:req.body.cantidad,
    latitud:req.body.latitud,
    longitud:req.body.longitud
    }
    try {
        const orden = new OrdenSchema(objecto);
        const saveResponse = await orden.save();
        res.send({ status: true, message: "La orden ha sido exitosamente guardada", orden: saveResponse });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const eliminarOrden = async (req: Request, res: Response) => {
    try {
        const removeResult = await OrdenSchema.deleteOne({ _id: req.params.id });
        res.send({ message: 'Registro eliminado', removeResult });
    } catch (error) {
        console.error('Error eliminando el Pokémon:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el Pokémon' });
    }
};









