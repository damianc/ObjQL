const max = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const maxOfNums = Math.max(...val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(maxOfNums, expectedResult);
			} else {
				return maxOfNums === expectedResult;
			}
		});
	};
	
};

export default max;