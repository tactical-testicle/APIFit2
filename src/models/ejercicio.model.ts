import mongoose, { Schema } from 'mongoose';

const ejercicioSchema: Schema = new Schema({
     idGrupo: {type: Schema.Types.ObjectId, ref:'grupos' },
     name: {type: String, required: true },
         
}, { collection: 'ejercicios'})

export default mongoose.model('Ejercicio', ejercicioSchema)