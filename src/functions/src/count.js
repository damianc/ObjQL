const count = ObjQL => {

	return (item, expectedResult) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const itemMatches = val.join('$$').match(
				new RegExp('(?:(?:\\$\\$)|\\b)' + item + '(?:(?:\\$\\$)|\\b)', 'g')
			);
			const itemOccurencies = itemMatches ? itemMatches.length : 0;

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(itemOccurencies, expectedResult);
			} else {
				return itemOccurencies === expectedResult;
			}
		});
	};
	
};

export default count;