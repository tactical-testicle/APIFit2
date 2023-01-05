import mongoose, { Schema } from 'mongoose';

const rolesPermitidos = ['Admin','client','Trainer'];

const userSchema: Schema = new Schema({
     ////////////////////////////////Admin, client and Trainer //////////////////////////
     name: {type: String, required: true },
     lasname: {type: String },
     cellphone: {type: String, required: true, unique: true},
     password: {type: String, required: true},
     email: {type: String, unique: true},
     role: {type: String,  enum: rolesPermitidos,default:"client"},
     address: {type: String, required: true },
     descripction:{type: String },
     vigente: {type: Boolean, required: true}     
}, { collection: 'users'})

export default mongoose.model('User', userSchema)