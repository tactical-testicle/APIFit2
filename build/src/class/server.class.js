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
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../../lib/logger"));
class Server {
    constructor() {
        this.port = config_1.default.get('api.port');
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
    }
    static get instance() {
        return this._instance || (this._instance = new this);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.httpServer.listen(this.port);
                logger_1.default.info(`Server run in port number ${this.port}`);
            }
            catch (err) {
                logger_1.default.error(err);
            }
        });
    }
}
exports.default = Server;
