import mongoose, { Schema } from 'mongoose';

const grupoSchema: Schema = new Schema({
     name: {type: String, required: true }     
}, { collection: 'grupos'})

export default mongoose.model('Grupo', grupoSchema)