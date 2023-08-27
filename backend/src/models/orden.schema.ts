import mongoose from "mongoose";
import { Orden } from "./orden.model";
import { Producto } from "./producto.model";



const schema = new mongoose.Schema<Orden>({
    
    idUsuario: mongoose.Types.ObjectId ,
    idMotorista: mongoose.Types.ObjectId ,
    estado: {
        type: String,
        required: true
    },
    productos: Array<Producto>,
    ubicacion: String,
    total: Number,
    cantidad:Number,
    latitud:Number,
    longitud:Number
})

export const OrdenSchema = mongoose.model('ordenes', schema);