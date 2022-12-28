import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    idUser: {type: Number, required: true, unique: true},
    formacion: {type: String, required: true},
}, {collection: 'trainers'})

export default mongoose.model('Trainer', userSchema);