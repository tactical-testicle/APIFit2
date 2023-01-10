import mongoose, { Schema, SchemaType } from 'mongoose';

const rutinaSchema: Schema = new Schema({
     ////////////////////////////////Admin, client and Trainer //////////////////////////
     idEjercicio: {type: Schema.Types.ObjectId, ref:'ejercicios'},
     fecha: {type: Date, required: true},
     serie: {type: Number, required: true},
     repeticion: {type: Number},
     tiempo: {type: String},
     completado: {type: Number, required: true },
     observacion: {type: String },
     idCliente: {type: Schema.Types.ObjectId, ref:'clientes'}
}, { collection: 'rutinas'})

export default mongoose.model('Rutina', rutinaSchema)