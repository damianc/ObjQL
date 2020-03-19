const count = ObjQL => {

	return (item, expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const itemMatches = val.join('$$').match(
				new RegExp('(?:(?:\\$\\$)|\\b)' + item + '(?:(?:\\$\\$)|\\b)', 'g')
			);
			const itemOccurencies = itemMatches ? itemMatches.length : 0;

			if (expectedResultMax === null) {
				return itemOccurencies === expectedResult;
			} else {
				return itemOccurencies >= expectedResult && itemOccurencies <= expectedResultMax;
			}
		});
	};
	
};

export default count;