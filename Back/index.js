import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import router from './routes/route';


const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

//?Aqui estan todas las rutas, FALTA IMPORTARLAS
app.use('/api', router);

app.listen(PORT, (req, res)=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});