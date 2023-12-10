const Router = require('express')
const usercontroller = require('../controllers/user-controller')
const router = new Router()

router.post('/registration', usercontroller.registration)
router.post('/login', usercontroller.login)
router.post('/logout', usercontroller.logout)
router.patch('/block', usercontroller.block)
router.delete('/delete', usercontroller.delete)
router.get('/refresh', usercontroller.refresh)
router.get('/users', usercontroller.getUsers)

module.exports = router 