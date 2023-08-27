import mongoose  from "mongoose";
import { Categoria } from "./categoria.model";
import { BaseEmpresa } from "./empresa.model";

const schema = new mongoose.Schema<Categoria>({

    imagen:String,
    nombre:String,
    empresas:Array<BaseEmpresa>

})

export const CategoriaSchema = mongoose.model('categorias', schema);