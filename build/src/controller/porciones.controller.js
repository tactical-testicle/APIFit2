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
const porciones_model_1 = __importDefault(require("../models/porciones.model"));
/////////////////////////////////////////
class PorcionesController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar porciones asigandas por cliente/////////////////////////
    consultaPorcioness(idCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            var original = true;
            return new Promise((resolve, reject) => {
                if (!idCliente) {
                    logger_1.default.error('Porciones no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                porciones_model_1.default.find({ idCliente, original }).populate([
                    { path: 'idCliente', model: 'Cliente', select: 'idUsuario',
                        populate: ([{
                                path: 'idUsuario',
                                model: 'User',
                                select: 'name lasname'
                            }])
                    }
                ])
                    .exec((err, porcionessLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Porciones asignadas al cliente localizadas exitosamente.');
                    return resolve({ ok: true, message: 'Porciones asignadas al cliente localizadas.', response: porcionessLocated, code: 200 });
                });
            });
        });
    }
    // Porciones que lleva consumidas el cliente.
    consultaPorcionessCheck(idCliente, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            var original = false;
            return new Promise((resolve, reject) => {
                if (!idCliente) {
                    logger_1.default.error('Porciones no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                porciones_model_1.default.find({ idCliente, fecha, original }).exec((err, porcionessLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Porciones que lleva consumidas el cliente.');
                    return resolve({ ok: true, message: 'Porciones que lleva consumidas el cliente.', response: porcionessLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////   
    ////////////////////////////////////////// Crear Porciones /////////////////////////
    createPorciones(porciones) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!porciones) {
                    logger_1.default.error('porciones no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                //Crear la porcion original
                porciones_model_1.default.create(porciones, (err, porcionesCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Porciones asignadas al cliente exitosamente.');
                    return resolve({ ok: true, message: 'Porciones asignadas al cliente exitosamente.', response: porcionesCreated, code: 200 });
                });
                //Crear registro para inicializar las porciones que van a ir chekeando
                porciones.frutas = 0;
                porciones.verduras = 0;
                porciones.cereales = 0;
                porciones.leguminosas = 0;
                porciones.origenAnimal = 0;
                porciones.leche = 0;
                porciones.grasa = 0;
                porciones.azucar = 0;
                porciones.original = false;
                porciones_model_1.default.create(porciones, (err, porcionesCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Porciones inicializadas al cliente exitosamente.');
                    return resolve({ ok: true, message: 'Porciones inicializadas al cliente exitosamente.', response: porcionesCreated, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////    
    ////////////////////////////////////////// Checkar Porciones al dia /////////////////////////
    updateCheckPorciones(porciones) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!porciones) {
                    logger_1.default.error('porciones no modified');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                //Revisar cuantas porciones llevaba            
                this.consultaPorcionessCheck(porciones.idCliente, porciones.fecha).then((response) => {
                    const porcionesOld = response.response;
                    console.log(porcionesOld[0]);
                    console.log("vieja leche: " + porcionesOld[0].leche);
                    const filter = { idCliente: porciones.idCliente, fecha: porciones.fecha, original: false };
                    const update = {
                        frutas: porciones.frutas, verduras: porciones.verduras,
                        cereales: porciones.cereales, leguminosas: porciones.leguminosas,
                        origenAnimal: porciones.origenAnimal, leche: (porciones.leche + porcionesOld[0].leche),
                        grasa: porciones.grasa, azucar: porciones.azucar
                    };
                    logger_1.default.info(filter + " - " + update);
                    porciones_model_1.default.updateOne(filter, update, (err, porcionesUpdate) => {
                        if (err) {
                            logger_1.default.error(err);
                            return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                        }
                        logger_1.default.info('Porcion consumida registrada exitosamente.');
                        return resolve({ ok: true, message: 'Porcion consumida registrada exitosamente.', response: porcionesUpdate, code: 200 });
                    });
                });
            });
        });
    }
}
exports.default = PorcionesController;
;
