import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IEjercicio from '../interfaces/ejercicio.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Ejercicio from '../models/ejercicio.model'

/////////////////////////////////////////

export default class EjercicioController {
///////////////////////////////////////////GETS////////////////////////////////////
    ////////////////////////////////////////// Consultar Ejercicio por Grupo /////////////////////////
    public async consultaIdEjercicioGrupo ( idGrupo: string): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !idGrupo ) {
                logger.error('ejercicio no located');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Ejercicio.find( {idGrupo}, ( err: any, ejercicioLocated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Ejercicios located succesfuly');
                return resolve({ ok: true, message: 'Ejercicio located', response: ejercicioLocated, code: 200 });
            });
        });
    }
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear Ejercicio /////////////////////////
    public async createEjercicio ( ejercicio: IEjercicio): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !ejercicio ) {
                logger.error('ejercicio no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Ejercicio.create( ejercicio, ( err: any, ejercicioCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Ejercicio created succesfuly');
                return resolve({ ok: true, message: 'Ejercicio created', response: ejercicioCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////

};

