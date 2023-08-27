import mongoose  from "mongoose";

export interface Administrador{
    _id?: mongoose.Types.ObjectId;
    usuario:string;
    contrasena:string;
}