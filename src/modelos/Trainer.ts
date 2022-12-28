import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUser: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    formacion: {type: String, required: true},
}, {collection: 'trainers'})

export default mongoose.model('Trainer', userSchema);