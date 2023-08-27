import express, {Request,Response,Express} from 'express';
import { Database } from './utils/database';
import UsuarioRouter from './routers/usuario.router';
import MotoristaRouter from './routers/motorista.router';
import AdministradorRouter from './routers/administrador.router';
import EmpresaRouter from './routers/empresa.router';
import CategoriaRouter from './routers/categoria.router';
import ProductoRouter from './routers/producto.router';
import OrdenRouter from './routers/orden.router';
import NotificacionRouter from './routers/notificacion.router';
import cors from 'cors';

const app:Express =express();
const db:Database= new Database();



app.use(express.json());
app.use(cors());
app.use('/usuarios',UsuarioRouter);
app.use('/motoristas',MotoristaRouter);
app.use('/administradores',AdministradorRouter);
app.use('/empresas',EmpresaRouter);
app.use('/categorias',CategoriaRouter);
app.use('/productos',ProductoRouter);
app.use('/ordenes',OrdenRouter);
app.use('/notificaciones',NotificacionRouter);

app.get('/',(req:Request, res:Response)=>{
    res.send('Backend de classroom');
    res.end();
}) 


app.listen('3000',()=>{
    console.log('server is runnign at http://localhost:3000')
})