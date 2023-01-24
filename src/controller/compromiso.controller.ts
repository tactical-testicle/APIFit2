import logger from '../../lib/logger';

//////////////////////////////interfaces
import IResponse from '../interfaces/response.interface';
import ICompromiso from '../interfaces/compromiso.interface';
/////////////////////////////////////////
//////////////////////////////Modelos
import Compromiso from '../models/compromiso.model'

/////////////////////////////////////////

export default class CompromisoController {
///////////////////////////////////////////GETS////////////////////////////////////
////////////////////////////////////////// Consultar compromiso actual del cliente/////////////////////////
public async consultaCompromiso (idCliente: string): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        if( !idCliente ) {
            logger.error('compromiso no located');
            return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
        }
        Compromiso.find({idCliente, vigencia:'true'}, ( err: any, compromisoLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Compromiso locateds succesfuly');
            return resolve({ ok: true, message: 'Compromiso locateds', response: compromisoLocated, code: 200 });
        });
    });
}

public async consultaMejorCompromiso (idCliente: string): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{        
        if( !idCliente ) {
            logger.error('compromiso no located');
            return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
        }
        Compromiso.findOne({idCliente, vigencia:false}, ( err: any, compromisoLocated: any ) => {
            if( err ){
                logger.error ( err );
                return reject({ ok: false, message: 'Error ', response: null, code: 500 });
            }
            logger.info('Mejor compromiso localizado exitosamente.');
            return resolve({ ok: true, message: 'Mejor compromiso localizado', response: compromisoLocated, code: 200 });
        }).sort({duracion:-1});
    });
}
///////////////////////////////////////////POST////////////////////////////////////
   
    ////////////////////////////////////////// Crear compromiso /////////////////////////
    public async createCompromiso ( compromiso: ICompromiso): Promise<IResponse>{
        return new Promise(( resolve, reject ) =>{
            if( !compromiso ) {
                logger.error('Compromiso no created');
                return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
            }
            Compromiso.create( compromiso, ( err: any, compromisoCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Compromiso created succesfuly');
                return resolve({ ok: true, message: 'Comprimiso created', response: compromisoCreated, code: 200 });
            });
        });
    }

////////////////////////////////////////// Reiniciar compromiso (Crear nuevo compromiso, y poner no-vigente el anterior) /////////////////////////
public async reinicioCompromiso ( compromiso: ICompromiso): Promise<IResponse>{
    return new Promise(( resolve, reject ) =>{
        if( !compromiso ) {
            logger.error('Compromiso no created');
            return reject({ ok: false, message: "Incorrect data", response: null, code: 400 });
        }
        this.consultaCompromiso(compromiso.idCliente).then(( response ) =>{
            const compromis = response.response
            var fecha1 = new Date (compromis[0].fechaCompromiso);
            var fecha2 = new Date (compromiso.fechaCompromiso);
            var diffFechas = fecha2.getTime()-fecha1.getTime();            
            //CAMBIAR A NO-VIGENTE EL COMPROMISO ANTERIOR Y AÑADIRLE LO QUE DURO
            Compromiso.updateOne({ idCliente: compromiso.idCliente, vigencia: true, duracion: 0}, { vigencia: false, duracion: diffFechas }, (err: any, compromisReiniciado: any) => {
                 if( err ){
                     logger.error ( err );
                     return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                 }
                 logger.info('Compromiso reinciado succesfuly');
                 return resolve({ ok: true, message: 'Compromiso reinciado succesfuly', response: compromisReiniciado, code: 200 });
             });            
            //CREAR NUEVO COMPROMISO
            Compromiso.create( compromiso, ( err: any, compromisoCreated: any ) => {
                if( err ){
                    logger.error ( err );
                    return reject({ ok: false, message: 'Error ', response: null, code: 500 });
                }
                logger.info('Compromiso created succesfuly');
                return resolve({ ok: true, message: 'Comprimiso created', response: compromisoCreated, code: 200 });
            });
         })
    });
}

};

