"use strict";
exports.__esModule = true;
var Ejemplo_1 = require("./Ejemplo");
var JWT_1 = require("./JWT");
var ConstructorEndpoints = /** @class */ (function () {
    function ConstructorEndpoints(app) {
        this.app = app;
        this.registrarEndPoints();
    }
    ConstructorEndpoints.prototype.registrarEndPoints = function () {
        this.app.get("/ejemplo", function (req, res) { return res.send((0, Ejemplo_1["default"])()); });
        this.app.get("/pruebajwt", function (req, res) {
            res.send(JWT_1["default"].ExtraerPayload('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJob3JhY2lvIiwiYXBlbGxpZG8iOiJzZXJyYW5vIiwiZXhwaXJhY2lvbiI6MTcxMzkyMzYyOSwiaWF0IjoxNzEzOTIzNTY5fQ.NBx3dp48RtVknTf4r5KJrRXKS30145SK2f_k3t5DzaM'));
        });
    };
    return ConstructorEndpoints;
}());
exports["default"] = ConstructorEndpoints;
