import mongoose from "mongoose";
import { BaseProducto } from "./producto.model";

export type Estado = "pendiente"|"tomada"|"encamino"|"eneldestino"|"enelorigen"

export interface Orden{
    _id?:mongoose.Types.ObjectId;
    idUsuario:mongoose.Types.ObjectId;
    idMotorista:mongoose.Types.ObjectId;
    estado: Estado;
    productos:Array<BaseProducto>;
    ubicacion:string;
    total:number;
    cantidad:number;
    latitud:number;
    longitud:number
}