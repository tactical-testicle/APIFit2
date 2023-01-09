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
const grupo_controller_1 = __importDefault(require("../controller/grupo.controller"));
//////////////////////////////////////////////
const GrupoRoutes = (0, express_1.Router)();
////////////////////////////////Servicios
const grupoService = new grupo_controller_1.default;
/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
GrupoRoutes.get('/consultaGrupos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield grupoService.consultaGrupos();
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
///////////////////////////////CREAR GRUPO MUSCULAR
GrupoRoutes.post('/createGrupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grupoBody = req.body;
    try {
        const response = yield grupoService.createGrupo(grupoBody);
        return res.status(response.code).json(response);
    }
    catch (err) {
        return res.status(err.code ? err.code : 500).json(err);
    }
}));
//////////////////////////////////FIN POST /////////////////////////////////////
exports.default = GrupoRoutes;
