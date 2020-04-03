const {default: ObjQL} = require('../prod/objql');

describe('The startsWith() method', () => {
	it('should select names that start with Ad', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.startsWith('Ad')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.startsWith('ad')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});

	it('should select names that start with Ad (case insensitive)', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.startsWith('aD', false)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam'}
			])
		);
	});
});