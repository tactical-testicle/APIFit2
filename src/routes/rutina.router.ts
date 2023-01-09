import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IRutina from '../interfaces/rutina.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import RutinaController from '../controller/rutina.controller';
//////////////////////////////////////////////

const RutinaRoutes = Router()
////////////////////////////////Servicios
const rutinaService = new RutinaController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
    RutinaRoutes.get('/consultaRutina/:idCliente/:fecha', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        let fecha = req.params.fecha;
        try{

            const response = await rutinaService.consultaRutinaCliente(idCliente, fecha);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR USUARIO
    RutinaRoutes.post('/createRutina', async ( req: Request, res: Response ) => {

        const rutinaBody: IRutina = req.body;
        
        try{

            const response = await rutinaService.createRutina(rutinaBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////

export default RutinaRoutes