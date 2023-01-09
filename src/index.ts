import Server from './class/server.class'
import MongoCon from '../lib/mongodb'
import cors from 'cors'
import express from 'express'
import UserRoutes from './routes/user.router'
import ClienteRoutes from './routes/cliente.router'

const server = Server.instance
const mongo = MongoCon.instance



server.app.enable('trusty proxy')

server.app.use(express.urlencoded({extended: true}))
server.app.use(express.json())

server.app.use(cors({origin: true, credentials: true}))

///////////////////////////////////PATHs////////////////////////////////////////////////////////
server.app.use('/user', UserRoutes)
server.app.use('/cliente', ClienteRoutes)

mongo.connectDB()


server.start()

