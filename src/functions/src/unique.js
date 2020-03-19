const unique = ObjQL => {

	return (expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const uniqueValues = new Set(val);

			if (expectedResultMax === null) {
				return uniqueValues.size === expectedResult;
			} else {
				return uniqueValues.size >= expectedResult && uniqueValues.size <= expectedResultMax;
			}
		});
	};
	
};

export default unique;