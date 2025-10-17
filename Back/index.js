import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());

app.listen(PORT, (req, res)=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});