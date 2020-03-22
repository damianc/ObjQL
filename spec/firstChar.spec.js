const {default: ObjQL} = require('../prod/objql');

describe('The firstChar() method', () => {
	it('should select names whose first letter equals A', () => {
		const collection = ObjQL([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.where({
			name: ObjQL.firstChar('A')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Adam'}, {name: 'Amadeus'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL([
			{name: 'Adam'}, {name: 'Mark'}, {name: 'Amadeus'}, {name: 'John'}
		]);

		const result = collection.where({
			name: ObjQL.firstChar('X')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});