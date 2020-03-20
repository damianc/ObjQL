const min = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const minOfNums = Math.min(...val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(minOfNums, expectedResult);
			} else {
				return minOfNums === expectedResult;
			}
		});
	};
	
};

export default min;