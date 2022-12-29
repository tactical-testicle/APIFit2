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
const User_1 = __importDefault(require("../modelos/User"));
class UserControllers {
    /////////////////////////// GETS ////////////////////////////
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                User_1.default.find({}, null, (err, userFinded) => {
                    if (err) {
                        return reject({ ok: false, message: 'Error ', reponse: null, code: 500 });
                    }
                    return resolve({ ok: true, message: 'Users list', response: userFinded, code: 200 });
                });
            });
        });
    }
    /////////////////////////// END GETS ////////////////////////////
    /////////////////////////// POST ////////////////////////////
    createUsers(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!usuario) {
                    return reject({ ok: false, message: "incorrect data", response: null, code: 400 });
                }
                User_1.default.create({ usuario }, (err, createUser) => {
                    if (err) {
                        return reject({ ok: false, message: "Error", response: null, code: 500 });
                    }
                    return resolve({ ok: true, message: 'User created', response: createUser, code: 200 });
                });
            });
        });
    }
}
exports.default = UserControllers;
