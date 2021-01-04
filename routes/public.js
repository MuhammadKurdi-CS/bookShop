import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'
import Books from '../modules/books.js'

const dbName = 'website.db'

/**
 * The public home page for the Book Shop
 * The users are able to view all the book sales without logging in
 * @name Public Home Page
 * @route {GET} /
 */

router.get('/', async ctx => {
	try {
		const book = await new Books(dbName)
		const data = await book.showBooks()
		ctx.hbs.books = data
		console.log('index All books', ctx.hbs.books)
		await ctx.render('index', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * The detail's page
 * The users are able to view it without logging in
 * @name Public Book Details Page
 * @route {GET} //purchases-index
 */
router.get('/purchases-index', async ctx => {
	try {
		const book = await new Books(dbName)
		const data = await book.showBook(ctx.request.query.id)
		ctx.hbs.item = data
		await ctx.render('show-book-index', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		const referrer = body.referrer || '/bookShop'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
