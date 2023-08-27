import mongoose  from "mongoose";

export type Estado ="disponible" | "nodisponible";

export interface Motorista{
    _id?:mongoose.Types.ObjectId;
    nombre:string;
    apellido:string;
    identificacion:string;
    direccion:string;
    telefono:string;
    email:string;
    placa:string;
    contrasena:string;
    estado?:Estado |null;

}