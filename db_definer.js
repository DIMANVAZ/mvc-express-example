
// Модуль создаёт Базу Данных (при отсутствии), схему-модель для Базы данных и экспортирует её.

import Sequelize from "sequelize";
import dotenv from 'dotenv'; // работа с переменными среды
dotenv.config();

const PG_USER=process.env.PG_USER; // имя пользователя
const PG_PASSWORD=process.env.PG_PASSWORD; // пароль
const PG_PORT=process.env.PG_PORT; // порт локалхоста

const baseUrl = `postgres://${PG_USER}:${PG_PASSWORD}@localhost:${PG_PORT}/`; // урл без указания на БД в конце
const params = { dialect: 'postgres', define: {freeTableName: true} }; // постгрес, разрешены любые имена таблиц

// подключение к указанной БД - возвращает коннектор
function connectDB(db_name){
    return new Sequelize(baseUrl + db_name, params);
}

// Создание новой БД. Возвращает либо коннектор(sequelize), либо false;
async function createDB(newDB='Moto_DB'){
    try {
        await connectDB('postgres')
            .getQueryInterface()
            .createDatabase(newDB);
        return connectDB(newDB);
    } catch (e) {
        // console.log(e.message);
        if(e.message.indexOf('уже существует') >= 0 ){
            return connectDB(newDB);
        }
        return false;  // если база ни создана, ни уже существует
    }
}

// определяем модель, название Таблицы, возвращаем модель
export async function defineModel(model_name, structure, params={tableName:'Motorcycles'}){
    const connector = await createDB();
    if(connector instanceof Sequelize){
        return connector.define(model_name, structure, params);
    }
    throw new Error ('Проблема с подключением к БД или созданием его!');
}
