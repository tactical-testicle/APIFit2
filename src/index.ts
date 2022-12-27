import Server from './class/server.class';
import MongoConn from '../lib/mongodb';
import cors from 'cors';
import express from 'express';

////////////// IMPORTAR RUTAS


const server = Server.instance;
const mongo = MongoConn.instance;

server.app.enable('trusty proxy');

server.app.use(express.urlencode({ extended: true }));
server.app.use(express.json())

server.app.use(cors({ origin: true, credentials: true}));


////////////////////// PATHS /////////////////////////////


///////////////////// CONNECTIONS STABILISHED///////////////
mongo.connectDB()
server.start()