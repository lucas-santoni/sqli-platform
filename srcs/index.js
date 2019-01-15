const Koa = require('koa');
const KoaRouter = require('koa-router');
const serve = require('koa-static');
const favicon = require('koa-favicon');

const SqlDatabase = require('./SqlDatabase');


const app = new Koa();
const router = new KoaRouter();

const allowedCORS = [
  'http://localhost:8080'
]

const sleep = time => new Promise(s => {
  setTimeout(s, time);
});

let sqlDatabase;
(async () => {
  console.log('Waiting for database...');
  await sleep(process.env.SQL_WAIT * 1000);
  console.log('Connecting...');
  sqlDatabase = new SqlDatabase({
    host: process.env.SQL_HOST,
    user: 'root',
    password: 'password',
    database: 'platform'
  });
})();

router.get('/hello', ctx => {
  ctx.body = 'Hello, world!\n'
});

router.get('/q/:nickname', async ctx => {
  const { nickname } = ctx.params;

  if (!nickname)
    return ctx.status = 400;

  const { results, query } = await sqlDatabase.getUsersWithNicknameUNSAFE(nickname)

  ctx.body = {
    results,
    query
  };
});

app.use(async (ctx, next) => {
  const { origin } = ctx.req.headers;

  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set('Access-Control-Allow-Credentials', 'true');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization, ' +
    'x-id, Content-Length, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS');

  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('_public'))
  .use(favicon(__dirname + '/public/favicon.ico'));

app.listen(8080, () => console.log('The plateform is running!'));