import {getAll, post, getOne, changeOne, remove} from "./db_service.js";

/*  Эта шутка - Контроллер - по замыслу - тонкая прослойка между запросами с фронта и бизнес-логикой(Сервисом).
Он ловит запросы, преобразует/проверяет их, очеловечивает данные и вызывает с этими данными
соответствующие методы у Сервиса. Ответы отдаёт тоже он.
А уже в Сервисе определены методы работы с БД (КРУД). */

export default class Controller {
    constructor() {
    }
    // получить все записи
    async getAll(req, res){
        const all = await getAll();
        res.status(200).send(JSON.stringify(all));
    }

    // внести запись
    async post(req, res){
        const {brand, model, year} = req.body;
        const result = await post({brand, model, year});
        res.status(201).send(JSON.stringify(result));
    }

    // получить запись по id (не через query, а через url-params просто)
    async getOne(req, res){
        const innerID = req.params.innerID;
        const result = await getOne(innerID);
        res.status(201).send(JSON.stringify(result));
    }

    // изменить запись по innerID (а откуда возьмётся innerID - это задача Контроллера)
    async put(req, res){
        const {innerID, brand, model, year} = req.body;
        console.log(innerID, brand, model, year);
        const result = await changeOne(innerID, {brand, model, year});
        res.status(201).send(JSON.stringify(result));
    }

    // удалить запись по innerID (а откуда возьмётся innerID - это задача Контроллера)
    async remove(req, res){
        const innerID = req.params.innerID;
        const result = await remove(innerID);
        res.status(201).send(JSON.stringify(result));
    }
}
