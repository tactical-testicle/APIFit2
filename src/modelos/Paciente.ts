import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUser: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    formacion: {type: String, required: true},
    edad: {type: Number, required: true},
    alergia: {type: String, required: true},
    enfermedad: {type: String, required: true},
    genero: {type: String, required: true},
    sexualidad: {type: String, required: true},
    nivelActividad: {type: Number, required: true}
}, {collection: 'pacientes'})

export default mongoose.model('Paciente', userSchema);