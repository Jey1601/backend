import mongoose from "mongoose";
import { Empresa } from "./empresa.model";

const schema = new mongoose.Schema<Empresa>({

    nombre: String,
    imagen: String,
    puntuacion: Number,
    descripcion: String,
    direccion: String,
    telefono: String,
    email: String,
    productos: Array<mongoose.Types.ObjectId>,

})

export const EmpresaSchema = mongoose.model('empresas', schema);