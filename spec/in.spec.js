const {default: ObjQL} = require('../prod/objql');

describe('The in() method', () => {
	it('should select people being 18, 21 or 24', () => {
		const collection = ObjQL([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.where({
			age: ObjQL.in([18, 21, 24])
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
			age: ObjQL.in(['18', '21', '24'])
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});