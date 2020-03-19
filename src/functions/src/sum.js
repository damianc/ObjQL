const sum = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const sumOfNums = val.reduce((a, b) => a + b, 0);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return sumOfNums >= min && sumOfNums <= max;
			} else {
				return sumOfNums === expectedResult;
			}
		});
	};
	
};

export default sum;