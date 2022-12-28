import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUserTrainer: {type: Number, required: true},
    idUserPaciente: {type: Number, required: true},
    fechaCreacion: {type: Date, required: true},
    vigencia: {type: Boolean, required: true},
    grupo: {type: Number, required: true},
    dias: {type: Number, required: true},
}, {collection: 'rutinaAsignadas'})

export default mongoose.model('RutinaAsignada', userSchema);