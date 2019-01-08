const router = require('koa-router')();
const userController = require('../controllers/user')

router.get('/list', userController.getlist)
router.post('/create', userController.create)

router.put('/modifyUser/:id', userController.update)

router.delete('/deleteUser/:id', userController.delete)

module.exports = router