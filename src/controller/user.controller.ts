import IResponse from '../interfaces/IResponse';
import IUser from '../interfaces/IUser';

import User from '../modelos/User';


export default class UserControllers {
    /////////////////////////// GETS ////////////////////////////
    public async listUsers(): Promise<IResponse>{
        return new Promise( ( resolve, reject ) => {
            User.find({}, null, (err: any, userFinded: any ) => {
                if( err ){
                    return reject({ ok: false, message: 'Error ', reponse: null, code: 500 });
                }
                return resolve({ok: true, message: 'Users list', response: userFinded, code:200})
            })
        })
    }

    /////////////////////////// END GETS ////////////////////////////

/////////////////////////// POST ////////////////////////////
    public async createUsers(usuario: IUser): Promise<IResponse>{
        return new Promise( ( resolve, reject ) => {
            if(!usuario){
                return reject({ok: false, message:"incorrect data", response: null, code: 400})
            }
            User.create({usuario}, (err: any, createUser: any) => {
                if( err ){
                    return reject({ok: false, message:"Error", response: null, code: 500})
                }
                return resolve({ok: true, message: 'User created', response: createUser, code:200})            
            })
        })
}
/////////////////////////// END POST ////////////////////////////
}