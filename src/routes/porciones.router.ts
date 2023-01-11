import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IPorciones from '../interfaces/porciones.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import PorcionesController from '../controller/porciones.controller';
//////////////////////////////////////////////

const PorcionesRoutes = Router()
////////////////////////////////Servicios
const porcionesService = new PorcionesController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    

    PorcionesRoutes.get('/consultaPorciones/:idCliente', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        try{           
            const response = await porcionesService.consultaPorcioness(idCliente);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    PorcionesRoutes.get('/consultaPorcionesCheck/:idCliente/:fecha', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        let fecha = new Date(req.params.fecha);
        try{           
            const response = await porcionesService.consultaPorcionessCheck(idCliente,fecha);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

   
    ///////////////////////////////ASIGNAR PORCIONES AL CLIENTE
    PorcionesRoutes.post('/createPorciones', async ( req: Request, res: Response ) => {

        const porcionesBody: IPorciones = req.body;
        
        try{

            const response = await porcionesService.createPorciones(porcionesBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    

    ///////////////////////////////CHECK PORCIONES POR DIA
    PorcionesRoutes.put('/checkPorciones', async ( req: Request, res: Response ) => {
        
        const porcionesBody: IPorciones = req.body;
        try{

            const response = await porcionesService.updateCheckPorciones(porcionesBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });
//////////////////////////////////FIN POST /////////////////////////////////////

export default PorcionesRoutes