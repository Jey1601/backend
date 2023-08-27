import mongoose  from "mongoose";
import { BaseEmpresa } from "./empresa.model";

export interface Categoria{
    _id?: mongoose.Types.ObjectId;
    imagen:string;
    nombre:string;
    empresas:Array<BaseEmpresa>
}