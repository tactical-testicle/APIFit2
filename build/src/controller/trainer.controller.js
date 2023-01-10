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
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
/////////////////////////////////////////
class TrainerController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar trainer general/////////////////////////
    consultaTrainers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                trainer_model_1.default.find((err, trainersLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Trainers locateds succesfuly');
                    return resolve({ ok: true, message: 'Trainers locateds', response: trainersLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////   
    ////////////////////////////////////////// Crear Trainer /////////////////////////
    createTrainer(trainer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!trainer) {
                    logger_1.default.error('grupo no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                trainer_model_1.default.create(trainer, (err, trainerCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Trainer created succesfuly');
                    return resolve({ ok: true, message: 'Trainer created', response: trainerCreated, code: 200 });
                });
            });
        });
    }
}
exports.default = TrainerController;
;
