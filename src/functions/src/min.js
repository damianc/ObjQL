const min = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const minOfNums = Math.min(...val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return minOfNums >= min && minOfNums <= max;
			} else {
				return minOfNums === expectedResult;
			}
		});
	};
	
};

export default min;