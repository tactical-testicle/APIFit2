import { Data } from 'ws';
import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IRutina from '../interfaces/rutina.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Rutina from '../models/rutina.model'

/////////////////////////////////////////

export default class UserController {
///////////////////////////////////////////GETS////////////////////////////////////

    ////////////////////////////////////////// Consultar Rutina por idCliente y fecha /////////////////////////
    public async consultaRutinaCliente ( idCliente: string, fecha: Data): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !idCliente || !fecha ) {
                logger.error('rutina no located');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Rutina.find( {idCliente, fecha}, ( err: any, rutinaLocated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Rutina located succesfuly');
                return resolve({ ok: true, message: 'Rutina located', response: rutinaLocated, code: 200 });
            });
        });
    }
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear Rutina /////////////////////////
    public async createRutina ( rutina: IRutina): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !rutina ) {
                logger.error('rutina no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Rutina.create( rutina, ( err: any, rutinaCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Rutina created succesfuly');
                return resolve({ ok: true, message: 'Rutina created', response: rutinaCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////

};
