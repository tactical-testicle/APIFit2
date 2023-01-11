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
const rutina_model_1 = __importDefault(require("../models/rutina.model"));
/////////////////////////////////////////
class RutinaController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Rutina por idCliente y fecha /////////////////////////
    consultaRutinaCliente(idCliente, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idCliente || !fecha) {
                    logger_1.default.error('rutina no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                rutina_model_1.default.find({ idCliente, fecha }).populate([
                    { path: 'idCliente', model: 'Cliente', select: 'edad peso genero idUsuario',
                        populate: ([{
                                path: 'idUsuario',
                                model: 'User',
                                select: 'name lasname vigente role'
                            }])
                    },
                    { path: 'idEjercicio', model: 'Ejercicio',
                        populate: ([{
                                path: 'idGrupo',
                                model: 'Grupo',
                                select: 'name'
                            }])
                    }
                ])
                    .exec((err, rutinaLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Rutina located succesfuly');
                    return resolve({ ok: true, message: 'Rutina located', response: rutinaLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear Rutina /////////////////////////
    createRutina(rutina) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!rutina) {
                    logger_1.default.error('rutina no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                rutina_model_1.default.create(rutina, (err, rutinaCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Rutina created succesfuly');
                    return resolve({ ok: true, message: 'Rutina created', response: rutinaCreated, code: 200 });
                });
            });
        });
    }
}
exports.default = RutinaController;
;
