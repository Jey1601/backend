import mongoose  from "mongoose";

export interface Usuario{
    _id?: mongoose.Types.ObjectId;
    nombre:string;
    apellido:string;
    email:string;
    telefono:string;
    contrasena:string;
    ordenes:Array<mongoose.Types.ObjectId> | null;
}

