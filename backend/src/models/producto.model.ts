import mongoose from "mongoose";

export interface BaseProducto{
    _id?:mongoose.Types.ObjectId;
    cantidad:number;
    precio:number;
   
}

export interface Producto extends BaseProducto{
    empresa:string;
    nombre:string;
    descripcion:string;
    imagen:string;
    
}