const unique = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const uniqueValues = new Set(val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return uniqueValues.size >= min && uniqueValues.size <= max;
			} else {
				return uniqueValues.size === expectedResult;
			}
		});
	};
	
};

export default unique;