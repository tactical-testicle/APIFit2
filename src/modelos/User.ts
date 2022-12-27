import mongoose, {Schema} from 'mongoose';
const rolesPermitidos = ['admin', 'client','trainer'];

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cellphone: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true},
    addres: {type: String, required: true},
    description: {type: String, required: true},
    findMe: {type: Schema.Types.ObjectId, ref: 'Address', required: [true, 'address id not found']}
}, {collection: 'users'})

export default mongoose.model('User', userSchema);