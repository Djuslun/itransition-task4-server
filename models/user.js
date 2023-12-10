const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  last_login: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
})

module.exports = model('User', UserSchema)