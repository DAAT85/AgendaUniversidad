import express from 'express';
import cors from 'cors';
import router from './routes/route.js';



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//?Aqui estan todas las rutas
app.use('/api', router);

app.listen(PORT, (req, res)=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});