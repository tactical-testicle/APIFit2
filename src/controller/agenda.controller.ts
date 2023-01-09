import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import IAgenda from '../interfaces/agenda.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Agenda from '../models/agenda.model'

/////////////////////////////////////////

export default class AgendaController {
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar agenda de trainer/////////////////////////
public async consultaAgenda (idTrainer: string): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        if( !idTrainer ) {
            logger.error('agenda no located');
            return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
        }
        Agenda.find({idTrainer}, ( err: any, agendaLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Citas del Trainer locateds succesfuly');
            return resolve({ ok: true, message: 'Citas locateds', response: agendaLocated, code: 200 });
        });
    });
}
    
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear agenda /////////////////////////
    public async createAgenda ( agenda: IAgenda): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !agenda ) {
                logger.error('agenda no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Agenda.create( agenda, ( err: any, agendaCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Citas created succesfuly');
                return resolve({ ok: true, message: 'Cita created', response: agendaCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////
////////////////////////////////////////// Modificar Cita /////////////////////////
    public async updateAgenda ( agenda: IAgenda): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !agenda ) {
                logger.error('cita no modified');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Agenda.updateOne( agenda, ( err: any, agendaModified: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Cita modified succesfuly');
                return resolve({ ok: true, message: 'Cita modified', response: agendaModified, code: 200 });
            });
        });
    }
   
    public async deleteAgenda (agenda : IAgenda): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{           
            if( !agenda ) {
                logger.error('cita no modified');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
               Agenda.deleteOne({agenda},( err: any, agendaDeleted: any ) => {
                    if( err ){
                        logger.error ( err );
                        return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                    }
                    logger.info('Cita deleted succesfuly');
                    return resolve({ ok: true, message: 'Cita deleted ', response: agendaDeleted, code: 200 });
                });
            })
        }    
};

