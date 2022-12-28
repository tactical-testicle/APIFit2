import IResponse from '../interfaces/IResponse';
import IUser from '../interfaces/IUser';

import User from '../modelos/User';


export default class UserControllers {
    /////////////////////////// GETS ////////////////////////////
    public async listUsers(): Promise<IResponse>{
        return new Promise( ( resolve, reject ) => {
            User.find({}, null, (err: any, userFinded: any ) => {
                if( err ){
                    return reject({ ok: false, message: 'Error en base de dato', reponse: null, code: 500 });
                }
                return resolve({ok: true, message: 'Lista de usuarios encontrados', response: userFinded, code:200})
            })
        })
    }

    /////////////////////////// END GETS ////////////////////////////

/////////////////////////// POST ////////////////////////////
    public async createUsers(usuario: IUser): Promise<IResponse>{
        return new Promise( ( resolve, reject ) => {
            User.create({User})
            return resolve({ok: true, message: 'Usuario creado', response: User, code:200})            
        })
}
/////////////////////////// END POST ////////////////////////////
}