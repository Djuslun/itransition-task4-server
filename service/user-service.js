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
    const token = await tokenService.removeToken({ refreshToken })
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findOne(userData.id)

    const userDataForClient = await this.prepareUserDataForClient(user)
    return userDataForClient
  }

  async prepareUserDataForClient(user) {
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find()
      return users.map(user => new UserDto(user))
    } catch (e) {

    }
  }

  async deleteUser(userId) {
    const deletedUser = await UserModel.findByIdAndDelete(userId)
    return new UserDto(deletedUser)
  }
}

module.exports = new UserService()