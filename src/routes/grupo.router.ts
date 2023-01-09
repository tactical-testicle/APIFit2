import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IGrupo from '../interfaces/grupo.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import GrupoController from '../controller/grupo.controller';
//////////////////////////////////////////////

const GrupoRoutes = Router()
////////////////////////////////Servicios
const grupoService = new GrupoController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    

    GrupoRoutes.get('/consultaGrupos', async (req: Request, res: Response) => {
        try{

            const response = await grupoService.consultaGrupos();

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    
    });

   
            ///////////////////////////////CREAR GRUPO MUSCULAR
    GrupoRoutes.post('/createGrupo', async ( req: Request, res: Response ) => {

        const grupoBody: IGrupo = req.body;
        
        try{

            const response = await grupoService.createGrupo(grupoBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////

export default GrupoRoutes