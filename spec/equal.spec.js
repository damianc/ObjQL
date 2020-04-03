const {default: ObjQL} = require('../prod/objql');

describe('The equal() method', () => {
	it('should select people being 18', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.select('*').where({
			age: ObjQL.equal(18)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', age: 18}
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
			age: ObjQL.equal('18')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});

	it('should select people being 18 (case insensitive)', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.select('*').where({
			age: ObjQL.equal('18', false)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', age: 18}
			])
		);
	});
});