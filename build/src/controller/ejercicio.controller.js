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
const ejercicio_model_1 = __importDefault(require("../models/ejercicio.model"));
/////////////////////////////////////////
class EjercicioController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Ejercicio por Grupo /////////////////////////
    consultaIdEjercicioGrupo(idGrupo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idGrupo) {
                    logger_1.default.error('ejercicio no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                ejercicio_model_1.default.find({ idGrupo }, (err, ejercicioLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Ejercicios located succesfuly');
                    return resolve({ ok: true, message: 'Ejercicio located', response: ejercicioLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear Ejercicio /////////////////////////
    createEjercicio(ejercicio) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!ejercicio) {
                    logger_1.default.error('ejercicio no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                ejercicio_model_1.default.create(ejercicio, (err, ejercicioCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Ejercicio created succesfuly');
                    return resolve({ ok: true, message: 'Ejercicio created', response: ejercicioCreated, code: 200 });
                });
            });
        });
    }
}
exports.default = EjercicioController;
;
