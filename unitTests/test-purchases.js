import test from 'ava'
import Purchases from '../modules/purchases.js'

test('Register Purchases : register a duplicate customerID', async test => {
	test.plan(1)
	const purchase = await new Purchases()
    const requestData = {customerID: 1, book_id: 3, amount: 56,}
	try {
		await purchase.new(requestData)
        await purchase.new(requestData)
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'customerID "1" already in use', 'incorrect error message')
        
	} finally {
		purchase.close()
	}
})

test('Register Purchases : error if blank customerID', async test => {
	test.plan(1)
	const purchase = await new Purchases()
    const requestData = {customerID: undefined, book_id: 3, amount: 56,}
	try {
		await purchase.new(requestData)
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
        
	} finally {
		purchase.close()
	}
})

