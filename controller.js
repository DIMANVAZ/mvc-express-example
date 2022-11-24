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
        res
            .status(200)
            .render('main', {allRecords:all, one:false, message:'getAll'});
    }

    // внести запись
    async post(req, res){
        const {brand, model, year} = req.body;
        const result = await post({brand, model, year});
        res
            .status(200)
            .render('main', {allRecords:false, one:result, message:'post'});
    }

    // получить запись по id (не через query, а через url-params просто)
    async getOne(req, res){
        const innerID = req.params.innerID;
        const result = await getOne(innerID);
        const message = result.length ? 'Запись найдена: ' : "Запись не найдена "
        res
            .status(200)
            .render('main', {allRecords:false, one:result[0], message:message});
    }

    // изменить запись по innerID (а откуда возьмётся innerID - это задача Контроллера)
    async put(req, res){
        const {brand, model, year} = req.body;
        const innerID = req.params.innerID;
        const result = await changeOne(innerID, {brand, model, year});
        const message = result[0] === 1 ? "Успешно обновлено: " : "Не вышло обновить: "
        res
            .status(200)
            .render('main', {allRecords:false, one:{innerID, brand, model, year}, message:message});
    }

    // удалить запись по innerID (а откуда возьмётся innerID - это задача Контроллера)
    async remove(req, res){
        const innerID = req.params.innerID;
        const result = await remove(innerID);

        const message = result === 1 ? "Успешно удалено: " : "Не вышло удалить: "
        res
            .status(200)
            .render('main', {allRecords:false, one:{innerID, brand:'', model:'', year:''}, message:message});
    }
}

