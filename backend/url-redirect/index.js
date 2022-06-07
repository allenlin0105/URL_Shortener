const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const validator = require('validator')
const moment = require('moment')
const { Bigtable } = require('@google-cloud/bigtable')
const crypto = require('crypto')

require('dotenv').config()

const app = new Koa()
const router = new Router()
const bigTableClient = new Bigtable()
const bigTableInstance = bigTableClient.instance(process.env.INSTANCE_ID)
const table = bigTableInstance.table(process.env.TABLE_ID)

const initBigTable = async () => {
  const [tableExists] = await table.exists()
  if (!tableExists) {
    console.log(`Creating table ${process.env.TABLE_ID}`)
    await table.create()
    await table.createFamily(process.env.COLUMN_FAMILY_ID, {
      rule: {
        age: {
          seconds: 1209600,
          nanos: 0,
        },
      }
    })
  }
  console.log('Big table instance initialized.')
}
initBigTable()

app.use(bodyparser())
app.use(json())

router.get('/:link', async (ctx) => {
  if (!validator.isLength(ctx.params.link, { min: 8, max: 8 })) {
    // ctx.status = 400
    // ctx.body = 'ERR_INVALID_LINK'
    ctx.redirect("http://34.80.193.44/error404.html")
    return
  }

  try {
    const [row] = await table.row(ctx.params.link).get()
    const data = JSON.parse(row.data[process.env.COLUMN_FAMILY_ID].value[0].value)
    if (moment(data.expiry) < moment()) {
      // ctx.status = 404
      ctx.redirect("http://34.80.193.44/error404.html")
    } else {
      ctx.redirect(data.url)
    }
  } catch (err) {
    // ctx.status = 404
    ctx.redirect("http://34.80.193.44/error404.html")
  }
})

app.use(router.routes())
app.listen(parseInt(process.env.PORT || '3000'))
