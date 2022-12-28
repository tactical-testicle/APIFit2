import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUserTrainer: {type: Schema.Types.ObjectId, ref: 'Trainer', required: true},
    idUserPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente', required: true},
    fecha: {type: Date, required: true, unique: true}
}, {collection: 'agendas'})

export default mongoose.model('Agenda', userSchema);