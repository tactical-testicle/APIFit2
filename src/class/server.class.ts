import http from 'http';
import config from 'config';
import express from 'express';


export default class Server {
    private port : number;
    private httpServer: http.Server;
    private static _instance: Server;
    public app: express.Application

    constructor(){
        this.port = config.get('api.port');
        this.app = express();
        this.httpServer = new http.Server( this.app );
    }

    public static get instance() {
        return this._instance || ( this._instance = new this );
    }

    async start() {
        try{
            await this.httpServer.listen( this.port )
            console.log(`Server corriendo en el puerto ${this.port}`);
        }catch(error){
            console.log(error)
        }
    }

}