import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import ITrainer from '../interfaces/trainer.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Trainer from '../models/trainer.model'

/////////////////////////////////////////

export default class TrainerController {
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar trainer general/////////////////////////
public async consultaTrainers (): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        Trainer.find( ( err: any, trainersLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Trainers locateds succesfuly');
            return resolve({ ok: true, message: 'Trainers locateds', response: trainersLocated, code: 200 });
        });
    });
}
    
///////////////////////////////////////////POST////////////////////////////////////   
    ////////////////////////////////////////// Crear Trainer /////////////////////////
    public async createTrainer (trainer: ITrainer): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !trainer ) {
                logger.error('grupo no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Trainer.create(trainer, ( err: any, trainerCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Trainer created succesfuly');
                return resolve({ ok: true, message: 'Trainer created', response: trainerCreated, code: 200 });
            });
        });
    }
    ////////////////////////////////////////FIN POST /////////////////////////////////////////    
};
