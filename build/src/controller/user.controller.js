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
    ///////////////////////////////////// GET USERS /////////////////////////////////////////
    listUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user_model_1.default.find({}, null, (err, userFinded) => {
                    if (err) {
                        logger_1.default.error('cant find users');
                        return reject({ ok: false, message: 'Error en la base de datos, vuelva a intentarlo por favor', response: null, code: 500 });
                    }
                    return resolve({ ok: true, message: 'Usuarios encontrados con éxito', response: userFinded, code: 200 });
                });
            });
        });
    }
    ;
    //////////////////////////////// GET USERS BY ID //////////////////////////////////////////////////////////
    listUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!id) {
                    logger_1.default.info('cant find user by id');
                    return reject({ ok: false, message: 'No se ha encontrado el Usuario', response: null, code: 500 });
                }
                user_model_1.default.findById({ _id: id }, null, (err, userFindedById) => {
                    if (err) {
                        logger_1.default.error('cant find by id, please try again');
                        return reject({ ok: false, message: 'Los datos proporcionados son incorrectos, favor de verificarlos', response: null, code: 400 });
                    }
                    return resolve({ ok: true, message: 'Usuario encontrado con éxito', response: userFindedById, code: 200 });
                });
            });
        });
    }
    ;
    /////////////////////////////////GET USERS BY NAME, CELLPHONE, EMAIL////////////////////////////////////////////
    listUserByName(name, cellphone, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!cellphone) {
                    logger_1.default.info('cellphone doesnt exits');
                    return reject({ ok: false, message: 'el numero proporcionado no se encuentra en la base de datos', response: null, code: 500 });
                }
                user_model_1.default.findOne({ _name: { $regex: name }, _email: { $regex: email }, _cellphone: { $regex: cellphone } }, null, (err, userFindedByName) => {
                    if (err) {
                        logger_1.default.error('cant find user');
                        return reject({ ok: false, message: 'Por favor verifica de nuevo los datos proporcionados', response: null, code: 400 });
                    }
                    return resolve({ ok: true, message: 'Datos encontrados con éxito', response: userFindedByName, code: 200 });
                });
            });
        });
    }
    ;
    ///////////////////////////////////////////FIN GETS////////////////////////////////////
    ////////////////////////////////////////// Crear Usuario /////////////////////////
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!user) {
                    logger_1.default.error('user no created');
                    return reject({ ok: false, message: "Datos incompletos", response: null, code: 400 });
                }
                user_model_1.default.create(user, (err, userCreated) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error inesperado', response: null, code: 500 });
                    }
                    logger_1.default.info('Usuario created succesfuly');
                    return resolve({ ok: true, message: 'Usuario creado correctamente', response: userCreated, code: 200 });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////Update User/////////////////////////////
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!user) {
                    logger_1.default.error('Cant find user');
                    return reject({ ok: false, message: 'Error inesperado', response: null, code: 500 });
                }
                user_model_1.default.updateOne({ _id: { $eq: id } }, { $set: user }, { upsert: false }, (err, userUpdate) => {
                    if (err) {
                        logger_1.default.error(err);
                        return reject({ ok: false, message: 'Error en actualización', response: null, code: 400 });
                    }
                    return resolve({ ok: true, message: 'Se actualizo con exito', response: userUpdate, code: 200 });
                });
            });
        });
    }
    //////////////////////////////////////// DELETE USERS /////////////////////////////////////////
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!id) {
                    logger_1.default.error('cant find user');
                    return reject({ ok: false, message: 'Error en la base de datos, por favor vuelva a intentarlo', response: null, code: 500 });
                }
                user_model_1.default.deleteOne({ _id: { $eq: id } }, (err, userDelete) => {
                    if (err) {
                        logger_1.default.error('Cant delete user');
                        return reject({ ok: false, message: 'No se ha podido borrar el usuario correctamente, por favor vuelva a intentarlo', response: null, code: 400 });
                    }
                    return resolve({ ok: true, message: 'Se ha borrado el usuario con éxito', response: userDelete, code: 200 });
                });
            });
        });
    }
    ;
}
exports.default = UserController;
;
