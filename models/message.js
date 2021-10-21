// TODO: Дать название модели, и описать ее поля
// Подключим настройку модели (Схемы) DB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Опишем нашу модель
const Message = new Schema({
    body: String,
    datetime: String,
    author_id: String
});

// Экспортируем модель нашего студента
module.exports = mongoose.model("Message", Message);