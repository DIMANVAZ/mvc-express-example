/*  Бизнес-логика ("Service")
Импортирует схему-модель (из db_manager) и делает с ней, что скажут (КРУД)
Функции для КРУДА определяются тут же.
В них попадают уже нормальные данные из Контроллера */

import Sequelize from "sequelize";
import DataTypes from "sequelize";
import {defineModel} from "./db_definer.js";

const MotoStructure = {
    innerID: {
        type: Sequelize.INTEGER, // можно так - через Sequelize
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    brand: {
        type: Sequelize.STRING, // ... а можно и так
        default: "деф марка!!!"
    },
    model: {
        type: DataTypes.STRING, // ... а можно и так - через Datatypes
        default: "деф модель!!!"
    },
    year: {
        type: DataTypes.INTEGER,
        default: 899
    },
}

let Moto;

try {
    Moto = await defineModel('Moto', MotoStructure);
}   catch (e) {
    console.log(e);
}
// получить все записи
export async function getAll(){
    await Moto.sync();
    return Moto.findAll();
}

// внести запись
export async function post(newRecord){
    await Moto.sync();
    return Moto.create(newRecord);
}

// получить запись по id (а откуда возьмётся id - это задача Контроллера)
export async function getOne(innerID){
    await Moto.sync();
    return Moto.findAll({
        where: {
            innerID: innerID,
        },
    });
}

// изменить запись по id (а откуда возьмётся id - это задача Контроллера)
export async function changeOne(innerID, partToChange){
    await Moto.sync();
    return Moto.update(
        partToChange,
        {
            where: {
                innerID: innerID,
            },
        }
    )
}

// удалить запись по id (а откуда возьмётся id - это задача Контроллера)
export async function remove(innerID){
    await Moto.sync();
    return Moto.destroy({
        where: {
            innerID: innerID
        },
    });
}
