import mongoose  from "mongoose";
import { Motorista } from "./motorista.model";


const schema = new mongoose.Schema<Motorista>({
    nombre:String,
    apellido:String,
    identificacion:String,
    direccion:String,
    telefono:String,
    email:String,
    placa:String,
    contrasena:String
    
    
})

export const MotoristaSchema = mongoose.model('motoristas', schema);