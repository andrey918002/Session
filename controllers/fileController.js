const fs = require("fs"); // работа с файловой системой
const ext = require("mime-types"); // анализ типа файла

exports.moveGallery = function (gallery, path){
    // console.log("Move files");
    // console.log(gallery);
    for ( let i = 0; i < gallery.length; i++){
        if(gallery[i].startsWith ("/upload/")) { // Если путь к картинке начинается с upload
            let newPlace = gallery[i].replace("/upload/", path); // поставим новый путь
            // console.log("мы находимся в папке: " + __dirname);
            fs.rename(
                __dirname + "/../public" + gallery[i],
                __dirname+ "/../public" + newPlace,
                function (err) {
                if(err) {console.log("Error moveGallery"); console.log(err);}
            });
            gallery[i] = newPlace;
        }
    }
    return gallery;
}

exports.createFile = function (request, response) {
    console.log("Start work with file");
    console.log(request.file);

    let newFileName = request.file.filename + "." + ext.extension(request.file.mimetype)

    fs.rename(
        request.file.path,
        request.file.path + "." + ext.extension(request.file.mimetype),
        function (err) {
            if(err) {
                console.log(err);
                response.send(err);
            }
        });

    response.send(newFileName);
}

exports.deleteFile = function (request, response) {

}

