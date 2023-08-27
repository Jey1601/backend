import mongoose  from "mongoose";
import { Producto } from "./producto.model";


const schema =  new mongoose.Schema<Producto>({
    nombre:String,
    descripcion:String,
    precio:Number,
    imagen:String,
    cantidad:Number,
    empresa:String,
})

export const ProductoSchema = mongoose.model('productos',schema);