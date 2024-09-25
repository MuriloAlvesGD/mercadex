import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './Routes.js';
import EnterpriseService from "./src/service/EnterpriseService.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(routes); // Usar as rotas de usuário

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Iniciar o servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
