/** @module Purchases */

import sqlite from 'sqlite-async'

/**
 * Purchases
 * ES6 module that handles the data for the customer's purchases.
 */
class Purchases {
	/**
   * Create a purchase object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user purchases
			const sql = `CREATE TABLE IF NOT EXISTS purchases\
            (id INTEGER PRIMARY KEY AUTOINCREMENT, customerID INTEGER, book_id INTEGER, amount INTEGER);`
            await this.db.run(sql)
			return this
		})()
	}

    /**
	 * registers a new user
	 * @param {Integer} user's cusomter ID
	 * @param {Integer} user's book ID
	 * @param {Integer} the cost of the book
	 * @returns {Boolean} returns true if the values has been added
	 */
    async new(requestData) {
        Array.from(arguments).forEach(val => {
            if (val.length === 0) throw new Error('missing field')
        })
        const sql = `INSERT INTO purchases(customerID, book_id, amount)\
        VALUES("${requestData.customerID}", "${requestData.book_id}", "${requestData.amount}")`
        await this.db.run(sql)
        return true
    }

    async close() {
		await this.db.close()
	}
}

export default Purchases