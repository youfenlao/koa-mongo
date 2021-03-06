const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const todo = require('../controllers/todo');

router.get('/todoAll', todo.all);
router.post('/todoCreate', todo.create);
router.delete('/todoDelete/:id', todo.destroy);
router.put('/todoUpdate/:id', todo.update);

module.exports = router;
