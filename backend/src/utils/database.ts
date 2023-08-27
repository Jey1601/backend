import mongoose from "mongoose";

//Conectarse a atlas
export class Database{
    MONGO_URL:string ='mongodb+srv://Jey:1234@classroom.ifroyjc.mongodb.net/QuickBuy?retryWrites=true&w=majority';

     constructor(){
        mongoose.Promise =Promise;
        mongoose.connect(this.MONGO_URL)
        mongoose.connection.on('error',(error:Error)=>console.log(error));
        console.log("Conectado a mongo");
     }
     

}