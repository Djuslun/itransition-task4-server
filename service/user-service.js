const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} exist already`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserModel.create({ email, password: hashPassword, name, last_login: new Date() })
    const userData = await this.prepareUserDataForClient(user)
    return userData
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} is not found`)
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      throw ApiError.BadRequest(`Wrong password`)
    }
    const userData = await this.prepareUserDataForClient(user)
    return userData
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async prepareUserDataForClient(user) {
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

module.exports = new UserService()