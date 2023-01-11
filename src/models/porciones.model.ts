import mongoose, { Schema, SchemaType } from 'mongoose';

const porcionesSchema: Schema = new Schema({
     idCliente: {type: Schema.Types.ObjectId, ref:'clientes'},
     frutas: {type: Number, required: true },
     verduras: {type: Number, required: true },
     cereales: {type: Number, required: true },
     leguminosas: {type: Number, required: true },
     origenAnimal: {type: Number, required: true },
     leche: {type: Number, required: true },
     grasa: {type: Number, required: true },
     azucar: {type: Number, required: true },
     fecha: {type: Date, required: true },
     original: {type: Boolean, required: true }       
}, { collection: 'porcioness'})

export default mongoose.model('Porciones', porcionesSchema)