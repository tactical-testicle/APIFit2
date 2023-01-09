import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IEjercicio from '../interfaces/ejercicio.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import EjercicioController from '../controller/ejercicio.controller';
//////////////////////////////////////////////

const EjercicioRoutes = Router()
////////////////////////////////Servicios
const ejercicioService = new EjercicioController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
    EjercicioRoutes.get('/consultaEjercicios/:idGrupo', async (req: Request, res: Response) => {
        let idGrupo = req.params.idGrupo;
        try{

            const response = await ejercicioService.consultaIdEjercicioGrupo(idGrupo);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR USUARIO
    EjercicioRoutes.post('/createEjercicio', async ( req: Request, res: Response ) => {

        const ejercicioBody: IEjercicio = req.body;
        
        try{

            const response = await ejercicioService.createEjercicio(ejercicioBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////

export default EjercicioRoutes