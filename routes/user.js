/**
 * Created by Carlos on 18-03-2015.
 */
module.exports = function (app) {

    var users = [];

    //OMG!!! this is most simply that use a Servlet
    //and the best part, how this is JS, we can create a JSON
    //without a JSONBuilder or json_encode, So Fu$%&ing Happy :)

    //"req" and "res" are "request" and "response" object respectively
    app.get("/user", function (req, res) {
        console.log("GET Request received");

       res.send({
           "users": users
       });
    });

    app.post("/user", function (req, res) {

        console.log("POST Request received");
        //Yeah this is the get parameter that we know

        var user = {
            name: req.body.name,
            lastName: req.body.lastName,
            age: req.body.age
        };

        users.push(user);

        res.send({
            "users": users
        });
    });

};
