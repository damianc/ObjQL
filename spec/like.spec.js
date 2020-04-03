const {default: ObjQL} = require('../prod/objql');

describe('The like() method', () => {
	it('should select names whose first and third letter is A', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.select('*').where({
			name: ObjQL.like('A_a%')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', age: 18},
				{name: 'Amadeus', age: 32}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.select('*').where({
			name: ObjQL.like('a_a%')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});