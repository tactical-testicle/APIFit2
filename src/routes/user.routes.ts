import { Router, Request, Response } from  'express';

import { verificaJWT } from '../middleware/authJwt';

import IUser from '../interfaces/IUser';
import UserControllers from '../controller/user.controller';


const UserRoutes = Router();
const userService = new UserControllers;


/////////////////////////// GETS ////////////////////////////
UserRoutes.get('/todos',async ( req: Request, res: Response ) => {
    try{
        const response = await userService.listUsers();
        return res.status(response.code).json( response );
    }catch(err: any){
        return res.status( err.code ? err.code : 500).json( err );
    }
})

/////////////////////////// END GETS ////////////////////////////

/////////////////////////// POST ////////////////////////////


/////////////////////////// END POST ////////////////////////////

/////////////////////////// PUTS ////////////////////////////


/////////////////////////// END PUTS////////////////////////////

export default UserRoutes