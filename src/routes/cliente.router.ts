import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import ICliente from '../interfaces/cliente.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import ClienteController from '../controller/cliente.controller';
//////////////////////////////////////////////

const ClienteRoutes = Router()
////////////////////////////////Servicios
const clienteService = new ClienteController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
 

    ClienteRoutes.get('/consultaClientes', async (req: Request, res: Response) => {
        try{

            const response = await clienteService.consultaClientes();

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });


    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR CLIENTE
    ClienteRoutes.post('/createCliente', async ( req: Request, res: Response ) => {

        const clienteBody: ICliente = req.body;
        
        try{

            const response = await clienteService.createCliente(clienteBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////


export default ClienteRoutes