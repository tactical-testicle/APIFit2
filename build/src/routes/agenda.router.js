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
const agenda_controller_1 = __importDefault(require("../controller/agenda.controller"));
//////////////////////////////////////////////
const AgendaRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const agendaService = new agenda_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
///////////////////////////////////////GETS///////////////////////////////////
AgendaRoutes.get('/consultaAgenda/:idTrainer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idTrainer = req.params.idTrainer;
    try {
        const response = yield agendaService.consultaAgenda(idTrainer);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////POSTS//////////////////////////////////////
///////////////////////////////CREAR CITA DE CLIENTE
AgendaRoutes.post('/createAgenda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agendaBody = req.body;
    try {
        const response = yield agendaService.createAgenda(agendaBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
//////////////////////////////////FIN POST /////////////////////////////////////
exports.default = AgendaRoutes;
