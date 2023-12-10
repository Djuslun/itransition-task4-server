const userService = require('../service/user-service')

class Usercontroller {
  async registration(req, res, next) {
    try {
      const { email, password, name } = req.body
      const userData = await userService.registration(email, password, name)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async block(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }
}

module.exports = new Usercontroller()