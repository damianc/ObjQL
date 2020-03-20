const unique = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const uniqueValues = new Set(val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(uniqueValues.size, expectedResult);
			} else {
				return uniqueValues.size === expectedResult;
			}
		});
	};
	
};

export default unique;