"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var ManejadorJWT = /** @class */ (function () {
    function ManejadorJWT() {
    }
    ManejadorJWT.FirmarToken = function (payload) {
        payload.expiracion = Math.floor(Date.now() / 1000) + ManejadorJWT.validezSegundos;
        var token = jsonwebtoken_1["default"].sign(payload, ManejadorJWT.secreto);
        return token;
    };
    ManejadorJWT.ExtraerPayload = function (token) {
        var payload = null;
        try {
            payload = jsonwebtoken_1["default"].verify(token, ManejadorJWT.secreto);
            return payload;
        }
        catch (_a) {
            return null;
        }
    };
    ManejadorJWT.TokenExpirada = function (token) {
        var payload = ManejadorJWT.ExtraerPayload(token);
        if (payload !== null) {
            if (payload.expiracion < Math.floor(Date.now() / 1000)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    ManejadorJWT.RenovarToken = function (token) {
        var payload = ManejadorJWT.ExtraerPayload(token);
        if (payload !== null) {
            if (payload.expiracion < Math.floor(Date.now() / 1000)) {
                var token_1 = ManejadorJWT.FirmarToken(payload);
                return token_1;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    ManejadorJWT.secreto = 'LaClaveSecreta';
    ManejadorJWT.validezSegundos = 60;
    return ManejadorJWT;
}());
exports["default"] = ManejadorJWT;
