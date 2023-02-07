import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IUser from '../interfaces/user.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import User from '../models/user.model';
import EncryptClass from "../class/encrypt";
/////////////////////////////////////////

export default class UserController {
    encrypt = new EncryptClass
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar Usuarios general/////////////////////////
public async consultaUsers (): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        User.find( ( err: any, usersLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Usuarios locateds succesfuly');
            return resolve({ ok: true, message: 'Users locateds', response: usersLocated, code: 200 });
        });
    });
}
    ////////////////////////////////////////// Consultar Usuario por Id/////////////////////////
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
    ////////////////////////////////////////// Delete logico Usuario /////////////////////////
    public async deleteUser ( id : string): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{

            if( !id ) {
                logger.error('user no deleted');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }

            this.consultaIdUser(id).then(( response ) =>{
               const user: IUser = response.response
               user.vigente = ( user.vigente == true) ? false : true
               User.updateOne( {_id:id},{vigente: user.vigente }, ( err: any, userDeleted: any ) => {
                    if( err ){
                        logger.error ( err );
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger.info('Usuario logical deleted succesfuly');
                    return resolve({ ok: true, message: 'User logical deleted ', response: userDeleted, code: 200 });
                });
            })
        });
    }

    // LOGIN
    loginAdministrator( email: string, password: string ): Promise<any> {
        console.log("loginAdministrator: "+email+" : "+password);
        return new Promise((resolve, reject) => {
            User.findOne({ email: email }, async ( err: any, adminDB: any ) => {
                if ( err ) {
                    logger.error(err)
                    return reject({ ok: false, message: 'Error en base de datos', response: err, code: 500 })
                }

                if ( !adminDB ) {
                    return reject({ ok: false, message: 'Datos incorrectos', response: 'No existe un usuario con este email', code: 404 })
                }
                console.log("adminDB.salt: "+ adminDB.salt );
                const { passwordHash } = this.encrypt.saltHashPassword( password, adminDB.salt )
                console.log(passwordHash +" : "+adminDB.password);
                if ( passwordHash === adminDB.password ) {
                    adminDB.salt = null
                    adminDB.password = null

                    try {
                        const token = await this.encrypt.genToken(adminDB)
                        return resolve({ ok: true, message: 'Usuario logueado con exito', response: null, token: token, code: 200 })
                    } catch( err ) {
                        return reject({ ok: false, message: 'Ocurrion un error al generar token', response: err, code: 500 })
                    }
                } else {
                    return reject({ ok: false, message: 'Ocurrio un error', response: 'Password incorrecto', code: 401 })
                }

            })
        })
    }

};

