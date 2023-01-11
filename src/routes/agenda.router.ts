import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IAgenda from '../interfaces/agenda.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import AgendaController from '../controller/agenda.controller';
//////////////////////////////////////////////

const AgendaRoutes = Router()
////////////////////////////////Servicios
const agendaService = new AgendaController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
 

    AgendaRoutes.get('/consultaAgenda/:idTrainer', async (req: Request, res: Response) => {
        let idTrainer = req.params.idTrainer;
        try{

            const response = await agendaService.consultaAgenda(idTrainer);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    AgendaRoutes.get('/consultaAgendaCliente/:idCliente', async (req: Request, res: Response) => {
        let idCliente = req.params.idCliente;
        try{

            const response = await agendaService.consultaAgendaCliente(idCliente);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR CITA DE CLIENTE
    AgendaRoutes.post('/createAgenda', async ( req: Request, res: Response ) => {

        const agendaBody: IAgenda = req.body;
        
        try{

            const response = await agendaService.createAgenda(agendaBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////
    AgendaRoutes.put('/updateAgenda', async ( req: Request, res: Response ) => {

        const agendaBody: IAgenda = req.body;
        
        try{

            const response = await agendaService.updateAgenda(agendaBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });

    ///////////////////////////////BORRADO CITA
    AgendaRoutes.put('/deleteAgenda', async ( req: Request, res: Response ) => {
        const agendaBody: IAgenda = req.body;            
        try{
    
            const response = await agendaService.deleteAgenda(agendaBody);
    
            return res.status( response.code ).json( response );
    
        }catch( err: any ){
    
            return res.status( err.code? err.code: 500).json(err);
    
        }
    });
export default AgendaRoutes