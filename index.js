// Основное ядро приложения.

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from "./router.js";
const app = new express();
app.use(express.json());    // не размещать слишком низко в коде: не будет читаться ответ req.body

app.use('/motos/', router); // роутер для адресов /motos/**

const PORT = process.env.APP_PORT || '5001';
app.listen(PORT, ()=> console.log('Listening on port', PORT));
