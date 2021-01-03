import test from 'ava'
import Books from '../modules/books.js'

test('BOOKS : create and get new book', async test => {
	test.plan(1) //arrange
	const book = await new Books() // no database specified so runs in-memory
    const requestData = {bookName: 'dgdhd', authorName: 'dgdhd', price: 5,
            image: 'sdd', description: 'dsdsd', EAN: 56
        }
	try {
        await book.createBooks(requestData) //add
        const showBooks = await book.showBooks()
        test.fail('error thrown')// assert
	} catch(err) {
        test.is(err.message, 'no books avaliable', 'incorrect error message')
	} finally {
		book.close()
	}
})

test('CREATEBOOK : register a duplicate bookName', async test => {
	test.plan(1)
	const book = await new Books()
    const requestData = {bookName: 'New Book', authorName: 'dgdhd', price: 5,
            image: 'sdd', description: 'dsdsd', EAN: 56
        }
	try {
		await book.createBooks(requestData)
		await book.createBooks(requestData)
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'bookName "New Book" already in use', 'incorrect error message')
        
	} finally {
		book.close()
	}
})

