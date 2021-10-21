// TODO: Дать название модели, и описать ее поля
// Подключим настройку модели (Схемы) DB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Опишем нашу модель
const Session = new Schema({
    user_id: String,
    created_at: String, // DateTime
    last_activity_at: String, //DateTime
    data: []
});

// Экспортируем модель нашего студента
module.exports = mongoose.model("Session", Session);