import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IUser from '../interfaces/user.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import User from '../models/user.model'

/////////////////////////////////////////

export default class UserController {
///////////////////////////////////////////GETS////////////////////////////////////
    
    public async consultaIdUser ( id: string): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !id ) {
                logger.error('user no located');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            User.findById( id, ( err: any, userLocated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Usuario located succesfuly');
                return resolve({ ok: true, message: 'User located', response: userLocated, code: 200 });
            });
        });
    }
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear Usuario /////////////////////////
    public async createUser ( user: IUser): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !user ) {
                logger.error('user no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            User.create( user, ( err: any, userCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Usuario created succesfuly');
                return resolve({ ok: true, message: 'User created', response: userCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////

    ////////////////////////////////////////// Modificar Usuario /////////////////////////
    public async updateUser ( user: IUser): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !user ) {
                logger.error('user no modified');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            User.updateOne( user, ( err: any, userModified: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Usuario modified succesfuly');
                return resolve({ ok: true, message: 'User modified', response: userModified, code: 200 });
            });
        });
    }
    
};

