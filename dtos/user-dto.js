module.exports = class UserDto {
  email;
  id;
  isActive;
  last_login;

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActive = model.isActive
    this.last_login = model.last_login
  }
}