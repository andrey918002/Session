// TODO: Дать название модели, и описать ее поля
// Подключим настройку модели (Схемы) DB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Опишем нашу модель
const User = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: String
});

// Экспортируем модель нашего студента
module.exports = mongoose.model("User", User);