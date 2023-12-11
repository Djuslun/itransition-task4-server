const Router = require('express')
const usercontroller = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 1 }),
  body('name').isLength({ min: 2 }),
  usercontroller.registration)

router.post('/login', usercontroller.login)
router.post('/logout', usercontroller.logout)
router.get('/refresh', usercontroller.refresh)
router.get('/users', authMiddleware, usercontroller.getUsers)
router.patch('/block/:userId', authMiddleware, usercontroller.block)
router.delete('/delete/:userId', authMiddleware, usercontroller.delete)

module.exports = router 