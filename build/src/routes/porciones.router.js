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
const porciones_controller_1 = __importDefault(require("../controller/porciones.controller"));
//////////////////////////////////////////////
const PorcionesRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const porcionesService = new porciones_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
PorcionesRoutes.get('/consultaPorciones/:idCliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCliente = req.params.idCliente;
    try {
        const response = yield porcionesService.consultaPorcioness(idCliente);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
PorcionesRoutes.get('/consultaPorcionesCheck/:idCliente/:fecha', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCliente = req.params.idCliente;
    let fecha = new Date(req.params.fecha);
    try {
        const response = yield porcionesService.consultaPorcionessCheck(idCliente, fecha);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////ASIGNAR PORCIONES AL CLIENTE
PorcionesRoutes.post('/createPorciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const porcionesBody = req.body;
    try {
        const response = yield porcionesService.createPorciones(porcionesBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////CHECK PORCIONES POR DIA
PorcionesRoutes.put('/checkPorciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const porcionesBody = req.body;
    try {
        const response = yield porcionesService.updateCheckPorciones(porcionesBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
//////////////////////////////////FIN POST /////////////////////////////////////
exports.default = PorcionesRoutes;
