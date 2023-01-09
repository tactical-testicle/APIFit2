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
const logger_1 = __importDefault(require("../../lib/logger"));
/////////////////////////////////////////
//////////////////////////////Modelos
const grupo_model_1 = __importDefault(require("../models/grupo.model"));
/////////////////////////////////////////
class GrupoController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Usuarios general/////////////////////////
    consultaGrupos() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                grupo_model_1.default.find((err, gruposLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuarios locateds succesfuly');
                    return resolve({ ok: true, message: 'Grupos locateds', response: gruposLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////   
    ////////////////////////////////////////// Crear Grupo /////////////////////////
    createGrupo(grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!grupo) {
                    logger_1.default.error('grupo no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                grupo_model_1.default.create(grupo, (err, grupoCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Grupo created succesfuly');
                    return resolve({ ok: true, message: 'Grupo created', response: grupoCreated, code: 200 });
                });
            });
        });
    }
}
exports.default = GrupoController;
;
