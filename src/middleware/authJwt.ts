import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from 'config'


export async function verificaJWT( req: Request, res: Response, next: NextFunction ){
    
    const token: any = req.headers.authorization;

    await verify( token, config.get("jwt.accessTokenSecret"), async ( err: any, decodificado: any ) => {
        if( err ){
            return res.status(401).json({
                ok: false,
                message: 'Token erroneo',
                err
            });
        }

        req.body.usuario = decodificado.usuario;

        next();
    });
}