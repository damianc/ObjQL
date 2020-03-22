const {default: ObjQL} = require('../prod/objql');

describe('The ref() method', () => {
	it('should select people having the same name as father', () => {
		const collection = ObjQL([
			{name: 'Adam', fatherName: 'George'},
			{name: 'Mark', fatherName: 'Mark'}
		]);

		const result = collection.where({
			name: ObjQL.ref('fatherName')
		});

		expect(result).toEqual(
			jasmine.arrayWithExactContents([
				{name: 'Mark', fatherName: 'Mark'}
			])
		);
	});

	it('should select no name', () => {
		const collection = ObjQL([
			{name: 'Adam', fatherName: 'George'},
			{name: 'Mark', fatherName: 'Mark'}
		]);

		const result = collection.where({
			name: ObjQL.ref('father')
		});

		expect(result).toEqual(
			jasmine.empty()
		);
	});
});