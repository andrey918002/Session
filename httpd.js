// подключение express
const express = require("express");
const app = express();

// Добавим модуль для разборки тела запроса
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// Разрешение забирать статические файлы из папки
app.use (express.static("public"));

// С файлами
const multer = require("multer");
// Сообщим верменную папку для хранения файлов
app.use(multer({dest: "public/upload"}).single("fileData"));


// Настрока машрутов
const route = require("./routers");
app.use(route);

// подключим MongoDB
const mongoose = require("mongoose");
// Строка соединения с базой данных
const uri = "mongodb+srv://userdb107:b047ieci@cluster0.onfut.mongodb.net/Chat?retryWrites=true&w=majority";
mongoose.connect(
    uri, { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        // Прервать, если ошибка соединения с базой данных
        if (err){
            console.log(err);
            return;
        }

        app.listen(3000, function () {
            console.log("http://localhost:3000");
        });
    });