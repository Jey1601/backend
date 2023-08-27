import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Categoria } from '../models/categoria.model';
import { CategoriaSchema } from '../models/categoria.schema';


export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const categorias: Array<Categoria> = await CategoriaSchema.find();
        res.send({ status: true, message: "Categorias obtenidos con exito", categorias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

export const obtenerCategoria = async (req: Request, res: Response) => {
    try {
        const categoria = await CategoriaSchema.find({_id:req.params.id});
        res.send({ status: true, message: "Categoria obtenida con exito", categoria });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
}

