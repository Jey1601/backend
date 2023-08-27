import mongoose  from "mongoose";
import { Administrador } from "./administrador.model";

const schema = new mongoose.Schema<Administrador>({

    usuario:String,
    contrasena:String,

})

export const AdministradorSchema = mongoose.model('administradores', schema);