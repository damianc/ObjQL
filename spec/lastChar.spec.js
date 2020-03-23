const {default: ObjQL} = require('../prod/objql');

describe('The lastChar() method', () => {
	it('should select names whose last letter equals n', () => {
		const collection = ObjQL.from([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.where({
			name: ObjQL.lastChar('n')
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

		const result = collection.where({
			name: ObjQL.lastChar('x')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});