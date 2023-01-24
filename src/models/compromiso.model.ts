import mongoose, { Schema } from 'mongoose';

const compromisoSchema: Schema = new Schema({
     ////////////////////////////////Client//////////////////////////
     idCliente: {type: Schema.Types.ObjectId, ref:'clientes' },
     fechaCompromiso: {type: Date, require: true, unique: true},
     vigencia: {type: Boolean, require: true},
     duracion: {type: Number}
}, { collection: 'compromisos'})

export default mongoose.model('Compromiso', compromisoSchema)

