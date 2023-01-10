import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import ITrainer from '../interfaces/trainer.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import TrainerController from '../controller/trainer.controller';
//////////////////////////////////////////////

const TrainerRoutes = Router()
////////////////////////////////Servicios
const trainerService = new TrainerController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    

    TrainerRoutes.get('/consultaTrainers', async (req: Request, res: Response) => {
        try{

            const response = await trainerService.consultaTrainers();

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

   
            ///////////////////////////////CREAR TRAINER 
    TrainerRoutes.post('/createTrainer', async ( req: Request, res: Response ) => {

        const trainerBody: ITrainer = req.body;
        
        try{

            const response = await trainerService.createTrainer(trainerBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////

export default TrainerRoutes