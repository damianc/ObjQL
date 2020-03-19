const count = ObjQL => {

	return (item, expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const itemMatches = val.join('$$').match(
				new RegExp('(?:(?:\\$\\$)|\\b)' + item + '(?:(?:\\$\\$)|\\b)', 'g')
			);
			const itemOccurencies = itemMatches ? itemMatches.length : 0;

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return itemOccurencies >= min && itemOccurencies <= max;
			} else {
				return itemOccurencies === expectedResult;
			}
		});
	};
	
};

export default count;