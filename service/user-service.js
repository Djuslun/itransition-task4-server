const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

class UserService {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`User with email ${email} exist already`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({ email, password: hashPassword, name })
  }
}

module.exports = new UserServicer()