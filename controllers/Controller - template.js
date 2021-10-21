// TODO: подключить модель для сущности
const model = require("../models/band");
// Create => POST
exports.post = function (request, response) {
    console.log("Run POST");
    const element = new model(request.body);
    element.save(function (err) {
        if (err) {
            console.log(err);
            return err;
        }
        return response.json(element);
    });
}

// Read => GET
exports.get = function (request, response) {
    console.log("Run GET");
    model.find({},
        function (err, allData ) {
            if (err){
                console.log(err);
                return err;
            }
            response.json(allData);
        }
    );
}

// Update => PUT
exports.put = function (request, response) {
    console.log("Run PUT");
}

// Delete => DELETE
exports.delete = function (request, response) {
    console.log("Run DELETE");
}