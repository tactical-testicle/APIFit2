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
const user_model_1 = __importDefault(require("../models/user.model"));
/////////////////////////////////////////
class UserController {
    ///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Usuarios general/////////////////////////
    consultaUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user_model_1.default.find((err, usersLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuarios locateds succesfuly');
                    return resolve({ ok: true, message: 'Users locateds', response: usersLocated, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////// Consultar Usuario por Id/////////////////////////
    consultaIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!id) {
                    logger_1.default.error('user no located');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                user_model_1.default.findById(id, (err, userLocated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuario located succesfuly');
                    return resolve({ ok: true, message: 'User located', response: userLocated, code: 200 });
                });
            });
        });
    }
    ///////////////////////////////////////////POST////////////////////////////////////
    ////////////////////////////////////////// Crear Usuario /////////////////////////
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!user) {
                    logger_1.default.error('user no created');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                user_model_1.default.create(user, (err, userCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuario created succesfuly');
                    return resolve({ ok: true, message: 'User created', response: userCreated, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////
    ////////////////////////////////////////// Modificar Usuario /////////////////////////
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!user) {
                    logger_1.default.error('user no modified');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                user_model_1.default.updateOne(user, (err, userModified) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuario modified succesfuly');
                    return resolve({ ok: true, message: 'User modified', response: userModified, code: 200 });
                });
            });
        });
    }
    ////////////////////////////////////////// Delete logico Usuario /////////////////////////
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!id) {
                    logger_1.default.error('user no deleted');
                    return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
                }
                this.consultaIdUser(id).then((response) => {
                    const user = response.response;
                    user.vigente = (user.vigente == true) ? false : true;
                    user_model_1.default.updateOne({ _id: id }, { vigente: user.vigente }, (err, userDeleted) => {
                        if (err) {
                            logger_1.default.error(err);
                            return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                        }
                        logger_1.default.info('Usuario logical deleted succesfuly');
                        return resolve({ ok: true, message: 'User logical deleted ', response: userDeleted, code: 200 });
                    });
                });
            });
        });
    }
}
exports.default = UserController;
;
