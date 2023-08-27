import mongoose  from "mongoose";
import { Motorista } from "./motorista.model";

export type Estado = "atendida"|"pendiente";

export interface Notificacion{
    _id?: mongoose.Types.ObjectId;
    informacion:Motorista;
    estado: Estado;
}