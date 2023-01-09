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
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
/////////////////////////////////////////
class ClienteController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Usuarios general/////////////////////////
    consultaClientes() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                cliente_model_1.default.find((err, clientesLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Clientes locateds succesfuly');
                    return resolve({ ok: true, message: 'Clientes locateds', response: clientesLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear Cliente /////////////////////////
    createCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!cliente) {
                    logger_1.default.error('cliente no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                cliente_model_1.default.create(cliente, (err, clienteCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Cliente created succesfuly');
                    return resolve({ ok: true, message: 'Cliente created', response: clienteCreated, code: 200 });
                });
            });
        });
    }
}
exports.default = ClienteController;
;
