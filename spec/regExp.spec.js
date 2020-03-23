const {default: ObjQL} = require('../prod/objql');

describe('The regExp() method', () => {
	it('should select names whose first letter is A and does not contain s letter', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.where({
			name: ObjQL.regExp(/^A[^s]+$/)
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

		const result = collection.where({
			name: ObjQL.regExp(/^a[^s]+$/)
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});

	it('should select names whose first letter is A and does not contain s letter (case insensitive)', () => {
		const collection = ObjQL.from([
			{name: 'Adam', age: 18},
			{name: 'Mark', age: 24},
			{name: 'Amadeus', age: 32},
			{name: 'John', age: 38}
		]);

		const result = collection.where({
			name: ObjQL.regExp(/^a[^s]+$/i)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', age: 18}
			])
		);
	});
});