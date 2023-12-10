module.exports = class UserDto {
  email;
  id;
  isActive;
  last_login;
  name;

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActive = model.isActive
    this.last_login = new Date()
    this.name = model.name
  }
}