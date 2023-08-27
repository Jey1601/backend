import mongoose  from "mongoose";
import { Notificacion } from "./notificacion.model";
import { MotoristaSchema } from "./motorista.schema";



const schema = new mongoose.Schema<Notificacion>({
    
    informacion:{
      type: Object,
      required: true,
    },
    estado: {
        type: String,
        required: true
      },
    
})

export const NotificacionSchema = mongoose.model('notificaciones', schema);