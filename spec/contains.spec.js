const {default: ObjQL} = require('../prod/objql');

describe('The contains() method', () => {
	it('should select names that contain ma', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.contains('ma')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Amadeus'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.contains('MA')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});

	it('should select names that contain ma (case insensitive)', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.select('*').where({
			name: ObjQL.contains('mA', false)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Amadeus'}, {name: 'Mark'}
			])
		);
	});
});