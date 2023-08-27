import mongoose from "mongoose";
import { Usuario } from "./usuario.model";

const schema = new mongoose.Schema<Usuario>({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    contrasena: String,
    ordenes: Array<mongoose.Types.ObjectId>,

})

export const UsuarioSchema = mongoose.model('usuarios',schema);