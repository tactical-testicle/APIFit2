"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
const stream = [
    { stream: process.stdout }
];
const options = (config_1.default.has('logger.options')) ? Object.assign({}, config_1.default.get('logger.options')) : {};
let logger = (0, pino_1.default)(options, pino_1.default.multistream(stream));
exports.default = logger;
