import mongoose, { Schema } from 'mongoose';


const rutinaSchema: Schema = new Schema({
     ////////////////////////////////Admin, client and Trainer //////////////////////////
     idCliente: {type: String, required: true },
     idEjercicio: {type: String, required: true, unique: true },
     fecha: {type: Date, required: true},
     serie: {type: Number, required: true},
     repeticion: {type: Number},
     tiempo: {type: String},
     completado: {type: Number, required: true },
     observacion:{type: String },
}, { collection: 'rutinas'})

export default mongoose.model('Rutina', rutinaSchema)