const Router = require('express')

const router = new Router()

router.post('/registration')
router.post('/login')
router.post('/logout')
router.patch('/block')
router.delete('/delete')
router.get('/refresh')
router.get('/users')

module.exports = { router }