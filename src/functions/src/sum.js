const sum = ObjQL => {

	return (expectedResult) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const sumOfNums = val.reduce((a, b) => a + b, 0);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(sumOfNums, expectedResult);
			} else {
				return sumOfNums === expectedResult;
			}
		});
	};
	
};

export default sum;