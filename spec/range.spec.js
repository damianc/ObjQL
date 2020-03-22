const {default: ObjQL} = require('../prod/objql');

describe('The range() method', () => {
	it('should select people being 15-30', () => {
		const collection = ObjQL([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.where({
			age: ObjQL.range(15, 30)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', age: 18},
				{name: 'Mark', age: 24}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.where({
			age: ObjQL.range(40, 50)
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});