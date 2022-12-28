"use strict";
exports.__esModule = true;
var server_class_1 = require("./class/server.class");
var mongodb_1 = require("../lib/mongodb");
var cors_1 = require("cors");
var express_1 = require("express");
////////////// IMPORTAR RUTAS
var server = server_class_1["default"].instance;
var mongo = mongodb_1["default"].instance;
server.app.enable('trusty proxy');
server.app.use(express_1["default"].urlencoded({ extended: true }));
server.app.use(express_1["default"].json());
server.app.use((0, cors_1["default"])({ origin: true, credentials: true }));
////////////////////// PATHS /////////////////////////////
///////////////////// CONNECTIONS STABILISHED///////////////
mongo.connectDB();
server.start();
