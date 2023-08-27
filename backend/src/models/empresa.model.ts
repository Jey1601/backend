import mongoose from "mongoose";

export interface BaseEmpresa {
    _id?: mongoose.Types.ObjectId;
    nombre: string;
    imagen: string;
    puntuacion: number;

}

export interface Empresa extends BaseEmpresa {
    descripcion: string;
    direccion: string;
    telefono: string;
    email: string;
    productos: Array<mongoose.Types.ObjectId>;
}