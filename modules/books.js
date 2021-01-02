/** @module Books */

import sqlite from 'sqlite-async'

/**
 * Books
 * ES6 module that handles the data for the book shop.
 */
class Books {
	/**
   * Create a book object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user books
			const sql = `CREATE TABLE IF NOT EXISTS users\
				(id INTEGER PRIMARY KEY AUTOINCREMENT, customerID INTEGER, bookName TEXT, authorName TEXT, 
                price INTEGER, images TEXT, description TEXT, EAN INTEGER);`
			await this.db.run(sql)
            const sql1 = `CREATE TABLE IF NOT EXISTS purchases\
                   (id INTEGER PRIMARY KEY AUTOINCREMENT, customerID INTEGER, book_id INTEGER, amount INTEGER);`
            await this.db.run(sql1)
			return this
		})()
	}

    /**
	 * Extracts all the book data in the system
	 * @returns {array} returns an array that holds all the book data in the website.db
	 */

    async showBooks() {
        const sql = 'SELECT id, bookName, authorName, price, images, description, EAN FROM books ORDER BY id DESC'
        const data = await this.db.all(sql)
        console.log('showing all books', data)
        return data
    }
    
    async showBooks() {
		const sql = 'SELECT id, bookName, authorName, price, images, description, EAN FROM books ORDER BY id DESC'
		const data = await this.db.all(sql)
		console.log('reg books', data)
		return data
    }
    
    async getBooks(customerID) {
		const sql = `SELECT id, bookName, authorName, price, images, description, EAN FROM books WHERE customerID = "${customerID}" ORDER BY id DESC`
		const data = await this.db.all(sql)
		console.log('reg books', data)
		return data
	}

	async showBook(id) {
		const sql = `SELECT id, bookName, authorName, price, images, description, EAN FROM books WHERE id = "${id}" ORDER BY id DESC`
		const books = await this.db.all(sql)
		const book = books[0]
		console.log('book', book)
		const purchaseSql = `SELECT id, amount, customerID FROM purchases WHERE book_id = "${id}" ORDER BY id DESC`
		const purchases = await this.db.all(purchaseSql)
		let paidSoFar = 0
		for (let i = 0; i < purchases.length; i++) {
			paidSoFar += purchases[i].amount
		}
		const data = {
			book: book,
			purchases: purchases,
			paidSoFar: paidSoFar,
			outstandingAmount: book.price - paidSoFar
		}
		return data
	}

    async close() {
		await this.db.close()
	}
}

export default Books