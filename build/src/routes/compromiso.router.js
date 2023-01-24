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
const compromiso_controller_1 = __importDefault(require("../controller/compromiso.controller"));
//////////////////////////////////////////////
const CompromisoRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const compromisoService = new compromiso_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS COMPROMISO CRUD ///////////////////////////////////////////
///////////////////////////////////////GETS///////////////////////////////////
CompromisoRoutes.get('/consultaCompromiso/:idCliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCliente = req.params.idCliente;
    try {
        const response = yield compromisoService.consultaCompromiso(idCliente);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
CompromisoRoutes.get('/consultaMejorCompromiso/:idCliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCliente = req.params.idCliente;
    try {
        const response = yield compromisoService.consultaMejorCompromiso(idCliente);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////POSTS//////////////////////////////////////
///////////////////////////////CREAR COMPROMISO DE CLIENTE
CompromisoRoutes.post('/createCompromiso', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const compromisoBody = req.body;
    try {
        const response = yield compromisoService.createCompromiso(compromisoBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////REINICIAR COMPROMISO
CompromisoRoutes.post('/reinicioCompromiso', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const compromisoBody = req.body;
    try {
        const response = yield compromisoService.reinicioCompromiso(compromisoBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
exports.default = CompromisoRoutes;
