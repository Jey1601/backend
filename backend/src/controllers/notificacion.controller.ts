import { Request, Response } from 'express';
import { Notificacion } from '../models/notificacion.model';
import { NotificacionSchema } from '../models/notificacion.schema';
import mongoose from 'mongoose';

export const obtenerNotificaciones = async (req: Request, res: Response) => {
    try {
        const notificaciones: Array<Notificacion> = await NotificacionSchema.find();
        res.send({ status: true, message: "Notificaciones obtenidas con exito", notificaciones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

export const agregarNotificacion = async (req: Request, res: Response) => {

    try {
        const notificacion = new NotificacionSchema(req.body);
        const saveResponse = await notificacion.save();
        res.send({ status: true, message: "La notificación ha sido exitosamente guardada", notificacion: saveResponse });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const eliminarNotificacion = async (req: Request, res: Response) => {
    try {
        const removeResult = await NotificacionSchema.deleteOne({ _id: req.params.id });
        res.send({ message: 'Registro eliminado', removeResult });
    } catch (error) {
        console.error('Error eliminando la notificacion:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar la notificacion' });
    }
}; 

export const obtenerNotificacion = async (req: Request, res: Response) => {

    try {
        const notificacion = await NotificacionSchema.findOne({ _id: req.params.id });
        if (notificacion) {
            res.send({ status: true, message: 'Notificion encontrada', notificacion });
        }
        else
            res.send({ status: false, message: 'Notificion no encontrado' });
        res.end();
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar', error });
    }

};

export const actualizarNotificacion = async (req: Request, res: Response) => {
    try {
        const updateResponse = await NotificacionSchema.updateOne({ _id: req.params.id }, req.body);
        res.send({ message: 'Registro actualizado', updateResponse }); //se editan solo los campos que se envian?
    } catch (error) {
        console.error(error);
        res.send({ message: 'Hubo un error al actualizar', error });
    }
};