import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUserTrainer: {type: Number, required: true},
    idUserPaciente: {type: Number, required: true},
    fecha: {type: Date, required: true, unique: true}
}, {collection: 'agendas'})

export default mongoose.model('Agenda', userSchema);