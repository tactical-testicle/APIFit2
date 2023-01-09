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
//////////////////////////////////////////////
//////////////////////////////////Controllers
const ejercicio_controller_1 = __importDefault(require("../controller/ejercicio.controller"));
//////////////////////////////////////////////
const EjercicioRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const ejercicioService = new ejercicio_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
///////////////////////////////////////GETS///////////////////////////////////
EjercicioRoutes.get('/consultaEjercicios/:idGrupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idGrupo = req.params.idGrupo;
    try {
        const response = yield ejercicioService.consultaIdEjercicioGrupo(idGrupo);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////POSTS//////////////////////////////////////
///////////////////////////////CREAR USUARIO
EjercicioRoutes.post('/createEjercicio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ejercicioBody = req.body;
    try {
        const response = yield ejercicioService.createEjercicio(ejercicioBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
//////////////////////////////////FIN POST /////////////////////////////////////
exports.default = EjercicioRoutes;
