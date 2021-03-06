const {default: ObjQL} = require('../prod/objql');

describe('The match() method', () => {
	it('should select people whose first result equals 4', () => {
		const collection = ObjQL.from([
			{name: 'Adam', results: [4, 5, 2, 3]},
			{name: 'Mark', results: [2, 4, 4, 5]}
		]);

		const result = collection.select('*').where({
			results: ObjQL.match(result => result[0] === 4)
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam', results: [4, 5, 2, 3]}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL.from([
			{name: 'Adam', results: [4, 5, 2, 3]},
			{name: 'Mark', results: [2, 4, 4, 5]}
		]);

		const result = collection.select('*').where({
			results: ObjQL.match(result => result[0] === 5)
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});