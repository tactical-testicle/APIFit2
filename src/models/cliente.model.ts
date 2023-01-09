import mongoose, { Schema } from 'mongoose';

const clienteSchema: Schema = new Schema({
     ////////////////////////////////Client//////////////////////////
     idUsuario: {type: String, required: true },
     idTrainer: {type: String },
     formacion: {type: String, required: true, unique: true},
     edad: {type: Number, required: true},
     peso: {type: Number, required: true},
     alergias: {type: String, unique: true},
     enfermedades: {type: String, required: true },
     genero:{type: String },
     embarazo:{type: Boolean },
     diabetes:{type: Boolean }
}, { collection: 'clientes'})

export default mongoose.model('Cliente', clienteSchema)

