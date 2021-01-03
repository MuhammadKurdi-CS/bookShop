import test from 'ava'
import Purchases from '../modules/purchases.js'

test('Purchases : Null input for amount throws error', async test => {
	test.plan(1) //arrange
	const purchase = await new Purchases() // no database specified so runs in-memory
	try {
        await purchase.new('1', '45', null) //add
        test.fail('error not thrown')
	} catch(err) {
        test.is(err.message, 'missing field', 'incorrect error message') // assert
	} finally {
		purchase.close()
	}
})
