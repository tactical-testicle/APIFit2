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
const agenda_model_1 = __importDefault(require("../models/agenda.model"));
/////////////////////////////////////////
class AgendaController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar agenda de trainer/////////////////////////
    consultaAgenda(idTrainer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idTrainer) {
                    logger_1.default.error('agenda no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                agenda_model_1.default.find({ idTrainer }, (err, agendaLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Citas del Trainer locateds succesfuly');
                    return resolve({ ok: true, message: 'Citas locateds', response: agendaLocated, code: 200 });
                });
            });
        });
    }
    consultaAgendaCliente(idCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!idCliente) {
                    logger_1.default.error('agenda no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                agenda_model_1.default.find({ idCliente }, (err, agendaLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Citas del cliente localizadas exitosamente.');
                    return resolve({ ok: true, message: 'Citas localizadas', response: agendaLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear agenda /////////////////////////
    createAgenda(agenda) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!agenda) {
                    logger_1.default.error('agenda no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                agenda_model_1.default.create(agenda, (err, agendaCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Citas created succesfuly');
                    return resolve({ ok: true, message: 'Cita created', response: agendaCreated, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////
    ////////////////////////////////////////// Modificar Cita /////////////////////////
    updateAgenda(agenda) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!agenda) {
                    logger_1.default.error('cita no modified');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                agenda_model_1.default.updateOne(agenda, (err, agendaModified) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Cita modified succesfuly');
                    return resolve({ ok: true, message: 'Cita modified', response: agendaModified, code: 200 });
                });
            });
        });
    }
    deleteAgenda(agenda) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!agenda) {
                    logger_1.default.error('cita no modified');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                agenda_model_1.default.deleteOne({ agenda }, (err, agendaDeleted) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Cita deleted succesfuly');
                    return resolve({ ok: true, message: 'Cita deleted ', response: agendaDeleted, code: 200 });
                });
            });
        });
    }
}
exports.default = AgendaController;
;
