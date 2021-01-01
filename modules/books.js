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
				(id INTEGER PRIMARY KEY AUTOINCREMENT, owner INTEGER, bookName TEXT, authorName TEXT, 
                price INTEGER, images TEXT, description TEXT, EAN INTEGER);`
			await this.db.run(sql)
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

    async close() {
		await this.db.close()
	}
}

export default Books