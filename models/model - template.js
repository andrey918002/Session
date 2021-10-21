// TODO: Дать название модели, и описать ее поля
// Подключим настройку модели (Схемы) DB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Опишем нашу модель
const ModelName = new Schema({
    name: String
});

// Экспортируем модель нашего студента
module.exports = mongoose.model("ModelName", ModelName);