'use strict';

const Router = require('koa-router');
const { UserService } = require('../services');

const router = new Router({
  prefix: '/auth'
});

router.post('/register', async ctx => {
  const body = ctx.request.body;
  const email = body.email;
  const password = body.password;
  try {
    const user = await UserService.createUser({
      email: email,
      password: password
    });
    const token = await UserService.createToken(user);
    ctx.ok({ token: token });
  } catch (err) {
    ctx.bad(400, err, { code: err.code ?? 0 });
  }
});

router.post('/login', async ctx => {
  const body = ctx.request.body;
  const email = body.email;
  const password = body.password;

  try {
    const user = await UserService.getUserByEmailAndPassword(email, password);
    const token = await UserService.createToken(user);
    ctx.ok({ token: token });
  } catch (err) {
    ctx.bad(400, err);
  }
});

router.get('/logout', async ctx => {
  ctx.ok();
});

module.exports = router;
