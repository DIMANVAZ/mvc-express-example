/* Это - роутер Express.
Задача конкретно этого модуля и экземпляра router - обработка эндпоинтов .../motos/*
Поэтому / = /motos/, а /:id = /motos/:id

Роутеров может быть несколько (userRouter, postsRouter и т.п.). Они могут быть разнесены по разным файлам-модулям */

import express from 'express';
const router = express.Router();

import Controller from './controller.js';
const {getAll, getOne, post, put, remove} = new Controller();

router.get('/', getAll);
router.post('/', post);
router.get('/:innerID', getOne);
router.put('/',put);
router.delete('/:innerID', remove);

export default router;
