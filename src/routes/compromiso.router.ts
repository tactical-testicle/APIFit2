import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import ICompromiso from '../interfaces/compromiso.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import CompromisoController from '../controller/compromiso.controller';
//////////////////////////////////////////////

const CompromisoRoutes = Router()
////////////////////////////////Servicios
const compromisoService = new CompromisoController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS COMPROMISO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
 

    CompromisoRoutes.get('/consultaCompromiso/:idCliente', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        try{

            const response = await compromisoService.consultaCompromiso(idCliente);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    CompromisoRoutes.get('/consultaMejorCompromiso/:idCliente', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        try{

            const response = await compromisoService.consultaMejorCompromiso(idCliente);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR COMPROMISO DE CLIENTE
    CompromisoRoutes.post('/createCompromiso', async ( req: Request, res: Response ) => {

        const compromisoBody: ICompromiso = req.body;
        
        try{

            const response = await compromisoService.createCompromiso(compromisoBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    

    ///////////////////////////////REINICIAR COMPROMISO
    CompromisoRoutes.post('/reinicioCompromiso', async ( req: Request, res: Response ) => {
        const compromisoBody: ICompromiso = req.body;            
        try{
    
            const response = await compromisoService.reinicioCompromiso(compromisoBody);
    
            return res.status( response.code ).json( response );
    
        }catch( err: any ){
    
            return res.status( err.code? err.code: 500).json(err);
    
        }
    });
export default CompromisoRoutes