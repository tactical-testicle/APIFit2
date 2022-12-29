import Server from './class/server.class'
import MongoCon from '../lib/mongodb'
import cors from 'cors'
import express from 'express'
import UserRoutes from './routes/user.router'

////////////////////////////////////END WS CONFIG ////////////////////////////////////////////
const server = Server.instance
const mongo = MongoCon.instance



server.app.enable('trusty proxy')

server.app.use(express.urlencoded({extended: true}))
server.app.use(express.json())

server.app.use(cors({origin: true, credentials: true}))

///////////////////////////////////PATHs////////////////////////////////////////////////////////
server.app.use('/user', UserRoutes)

mongo.connectDB()


server.start()

