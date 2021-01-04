import Router from 'koa-router'

const router = new Router({ prefix: '/bookShop' })
import Books from '../modules/books.js'
const dbName = 'website.db'

async function checkAuth(ctx, next) {
	console.log('bookShop router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/bookShop')
	await next()
}

router.use(checkAuth)

/**
 * The secure home page for the Book Shop
 * The users are able to view all the books for sale when they are logged in
 * @name Secure Home Page
 * @route {GET} /
 */

router.get('/', async ctx => {
	try {
		const book = await new Books(dbName)
		const data = await book.showBooks()
		ctx.hbs.books = data
		console.log('All books', ctx.hbs.books)
		console.log('hbs bod', ctx.hbs)
		await ctx.render('bookShop', ctx.hbs)
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})

export default router
