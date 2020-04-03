const {default: ObjQL} = require('../prod/objql');

describe('The nthChar() method', () => {
	it('should select names whose third letter equals a', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.nthChar('a', 2)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam'}, {name: 'Amadeus'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.nthChar('x', 2)
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});