const {default: ObjQL} = require('../prod/objql');

describe('The is() method', () => {
	it('should select people being under 1 year', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 0}
		]);

		const result = collection.where({
			age: ObjQL.is(0)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'John', age: 0}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 0}
		]);

		const result = collection.where({
			age: ObjQL.is(-0)
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});