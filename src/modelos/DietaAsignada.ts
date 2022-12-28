import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUserTrainer: {type: Schema.Types.ObjectId, ref: 'Trainer', required: true},
    idUserPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente', required: true},
    fechaCreacion: {type: Date, required: true},
    vigencia: {type: Boolean, required: true},
    calorias: {type: Number, required: true},    
    frutas: {type: Number, required: true},
    verduras: {type: Number, required: true},
    cereales: {type: Number, required: true},
    leguminosas: {type: Number, required: true},    
    origenanimal: {type: Number, required: true},
    lacteos: {type: Number, required: true},
    azucar: {type: Number, required: true},
    grasas: {type: Number, required: true},
    agua: {type: Number, required: true}
}, {collection: 'dietaAsignadas'})

export default mongoose.model('DietaAsignada', userSchema);