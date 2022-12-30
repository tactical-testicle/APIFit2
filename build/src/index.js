"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_class_1 = __importDefault(require("./class/server.class"));
const mongodb_1 = __importDefault(require("../lib/mongodb"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const server = server_class_1.default.instance;
const mongo = mongodb_1.default.instance;
server.app.enable('trusty proxy');
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
///////////////////////////////////PATHs////////////////////////////////////////////////////////
server.app.use('/user', user_router_1.default);
mongo.connectDB();
server.start();
