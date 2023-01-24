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
const compromiso_model_1 = __importDefault(require("../models/compromiso.model"));
/////////////////////////////////////////
class CompromisoController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar compromiso actual del cliente/////////////////////////
    consultaCompromiso(idCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idCliente) {
                    logger_1.default.error('compromiso no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                compromiso_model_1.default.find({ idCliente, vigencia: 'true' }, (err, compromisoLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Compromiso locateds succesfuly');
                    return resolve({ ok: true, message: 'Compromiso locateds', response: compromisoLocated, code: 200 });
                });
            });
        });
    }
    consultaMejorCompromiso(idCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idCliente) {
                    logger_1.default.error('compromiso no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                compromiso_model_1.default.findOne({ idCliente, vigencia: false }, (err, compromisoLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Compromiso localizado exitosamente.');
                    return resolve({ ok: true, message: 'Compromiso localizadas', response: compromisoLocated, code: 200 });
                }).sort({ duracion: -1 });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear compromiso /////////////////////////
    createCompromiso(compromiso) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!compromiso) {
                    logger_1.default.error('Compromiso no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                compromiso_model_1.default.create(compromiso, (err, compromisoCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Compromiso created succesfuly');
                    return resolve({ ok: true, message: 'Comprimiso created', response: compromisoCreated, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////// Reiniciar compromiso (Crear nuevo compromiso, y poner no-vigente el anterior) /////////////////////////
    reinicioCompromiso(compromiso) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!compromiso) {
                    logger_1.default.error('Compromiso no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                this.consultaCompromiso(compromiso.idCliente).then((response) => {
                    const compromis = response.response;
                    var fecha1 = new Date(compromis[0].fechaCompromiso);
                    var fecha2 = new Date(compromiso.fechaCompromiso);
                    var diffFechas = fecha2.getTime() - fecha1.getTime();
                    //CAMBIAR A NO-VIGENTE EL COMPROMISO ANTERIOR Y AÑADIRLE LO QUE DURO
                    compromiso_model_1.default.updateOne({ idCliente: compromiso.idCliente, vigencia: true, duracion: 0 }, { vigencia: false, duracion: diffFechas }, (err, compromisReiniciado) => {
                        if (err) {
                            logger_1.default.error(err);
                            return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                        }
                        logger_1.default.info('Compromiso reinciado succesfuly');
                        return resolve({ ok: true, message: 'Compromiso reinciado succesfuly', response: compromisReiniciado, code: 200 });
                    });
                    //CREAR NUEVO COMPROMISO
                    compromiso_model_1.default.create(compromiso, (err, compromisoCreated) => {
                        if (err) {
                            logger_1.default.error(err);
                            return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                        }
                        logger_1.default.info('Compromiso created succesfuly');
                        return resolve({ ok: true, message: 'Comprimiso created', response: compromisoCreated, code: 200 });
                    });
                });
            });
        });
    }
}
exports.default = CompromisoController;
;
