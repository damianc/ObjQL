const {default: ObjQL} = require('../prod/objql');

describe('The endsWith() method', () => {
	it('should select names that end with hn', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.endsWith('hn')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'John'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.endsWith('HN')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});

	it('should select names that end with hn (case insensitive)', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.endsWith('Hn', false)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'John'}
			])
		);
	});
});