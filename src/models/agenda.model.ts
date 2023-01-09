import mongoose, { Schema } from 'mongoose';

const agendaSchema: Schema = new Schema({
     ////////////////////////////////Client//////////////////////////
     idUsuario: {type: String, required: true },
     idTrainer: {type: String, require: true },
     fecha: {type: Date, require: true}
}, { collection: 'agendas'})

export default mongoose.model('Agenda', agendaSchema)

