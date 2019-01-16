const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
})
const userController = require('../controllers/user')

router.get('/list', userController.getlist)

router.get('/get/:nickname', userController.getOne)

router.post('/create', userController.create)

router.put('/modifyUser/:id', userController.update)

router.delete('/deleteUser/:id', userController.delete)

module.exports = router
