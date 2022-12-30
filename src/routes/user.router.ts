import {Router, Request, Response} from 'express';



import logger from '../../lib/logger'

/////////////////////////////////////interface
import IUser from '../interfaces/user.interface';
//////////////////////////////////////////////
//////////////////////////////////Controllers
import UserController from '../controller/user.controller';
//////////////////////////////////////////////

const UserRoutes = Router()
////////////////////////////////Servicios
const userService = new UserController
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////RUTAS USUARIO CRUD ///////////////////////////////////////////
    ///////////////////////////////////////GETS///////////////////////////////////
    UserRoutes.get('/user/ping', async (req: Request, res: Response) => {
    
        logger.info('ping received');
    
        res.status(200).json('/pong');
    
    });
    ///////////////////////////////POSTS//////////////////////////////////////
            ///////////////////////////////CREAR USUARIO
    UserRoutes.post('/createUser', async ( req: Request, res: Response ) => {

        const userBody: IUser = req.body;
        
        try{

            const response = await userService.createUser(userBody);

            return res.status( response.code ).json( response );

        }catch( err: any ){

            return res.status( err.code? err.code: 500).json(err);

        }
    });    
//////////////////////////////////FIN POST /////////////////////////////////////
///////////////////////////////PUTS//////////////////////////////////////
            ///////////////////////////////MODIFICAR USUARIO
UserRoutes.put('/updateUser', async ( req: Request, res: Response ) => {

    const userBody: IUser = req.body;
    
    try{

        const response = await userService.updateUser(userBody);

        return res.status( response.code ).json( response );

    }catch( err: any ){

        return res.status( err.code? err.code: 500).json(err);

    }
});

export default UserRoutes