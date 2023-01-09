import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import ICliente from '../interfaces/cliente.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Cliente from '../models/cliente.model'

/////////////////////////////////////////

export default class ClienteController {
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar Usuarios general/////////////////////////
public async consultaClientes (): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        Cliente.find( ( err: any, clientesLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Clientes locateds succesfuly');
            return resolve({ ok: true, message: 'Clientes locateds', response: clientesLocated, code: 200 });
        });
    });
}
    
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear Cliente /////////////////////////
    public async createCliente ( cliente: ICliente): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !cliente ) {
                logger.error('cliente no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Cliente.create( cliente, ( err: any, clienteCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Cliente created succesfuly');
                return resolve({ ok: true, message: 'Cliente created', response: clienteCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////

   
};

