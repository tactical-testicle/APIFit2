import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IGrupo from '../interfaces/grupo.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Grupo from '../models/grupo.model'

/////////////////////////////////////////

export default class GrupoController {
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar Usuarios general/////////////////////////
public async consultaGrupos (): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        Grupo.find( ( err: any, gruposLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Usuarios locateds succesfuly');
            return resolve({ ok: true, message: 'Grupos locateds', response: gruposLocated, code: 200 });
        });
    });
}
    
///////////////////////////////////////////POST////////////////////////////////////   
    ////////////////////////////////////////// Crear Grupo /////////////////////////
    public async createGrupo (grupo: IGrupo): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !grupo ) {
                logger.error('grupo no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Grupo.create(grupo, ( err: any, grupoCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Grupo created succesfuly');
                return resolve({ ok: true, message: 'Grupo created', response: grupoCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////    
};

