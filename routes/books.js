import Router from 'koa-router'
import koaBody from 'koa-body'

const router = new Router()

import Books from '../modules/books.js'
import Purchases from '../modules/purchases.js'
const dbName = 'website.db'

router.get('/book/purchases', async ctx => {
    if (ctx.session.authorised) {
        const book = await new Books(dbName)
        try {
            const data = await book.showBook(ctx.request.query.id)
            ctx.hbs.item = data
            await ctx.render('show-book', ctx.hbs)
        } catch (err) {
            ctx.hbs.message = err.message
            await ctx.render('error', ctx.hbs)
        }
    } else {
        ctx.redirect('/login')
    }
})

router.post('/book/purchases', koaBody, async ctx => {
    const purchase = await new Purchases(dbName)
    console.log('bod', ctx.request.body)
    try {
        const requestData = {
            customerID: ctx.session.authUser,
            book_id: ctx.request.body.book_id,
            amount: ctx.request.body.amount,
        }
        await purchase.new(requestData)
        ctx.redirect(`/book/purchases?id=${ctx.request.body.book_id}`)
    } catch (err) {
        ctx.hbs.msg = err.message
        ctx.hbs.body = ctx.request.body
        await ctx.render('show-book', ctx.hbs)
    }
})

export default router