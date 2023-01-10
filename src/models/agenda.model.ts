import mongoose, { Schema } from 'mongoose';

const agendaSchema: Schema = new Schema({
     ////////////////////////////////Client//////////////////////////
     idUsuario: {type: Schema.Types.ObjectId, ref:'clientes' },
     idTrainer: {type: Schema.Types.ObjectId, ref:'trainers' },
     fecha: {type: Date, require: true, unique: true}
}, { collection: 'agendas'})

export default mongoose.model('Agenda', agendaSchema)

