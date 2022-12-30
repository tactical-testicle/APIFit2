"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../lib/logger"));
//////////////////////////////////////////////
//////////////////////////////////Controllers
const user_controller_1 = __importDefault(require("../controller/user.controller"));
//////////////////////////////////////////////
const UserRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const userService = new user_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
///////////////////////////////////////GETS///////////////////////////////////
UserRoutes.get('/user/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('ping received');
    res.status(200).json('/pong');
}));
///////////////////////////////POSTS//////////////////////////////////////
///////////////////////////////CREAR USUARIO
UserRoutes.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    try {
        const response = yield userService.createUser(userBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
//////////////////////////////////FIN POST /////////////////////////////////////
///////////////////////////////PUTS//////////////////////////////////////
///////////////////////////////MODIFICAR USUARIO
UserRoutes.put('/updateUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    try {
        const response = yield userService.updateUser(userBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
exports.default = UserRoutes;
