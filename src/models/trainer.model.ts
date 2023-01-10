import mongoose, { Schema } from 'mongoose';

const trainerSchema: Schema = new Schema({
     idUsuario: {type: Schema.Types.ObjectId, ref:'users'},
     gym: {type: String, required: true }     
}, { collection: 'trainers'})

export default mongoose.model('Trainer', trainerSchema)