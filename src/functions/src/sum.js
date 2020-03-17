const sum = ObjQL => {

	return (expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			const sumOfNums = val.reduce((a, b) => a + b, 0);

			if (expectedResultMax === null) {
				return sumOfNums === expectedResult;
			} else {
				return sumOfNums >= expectedResult && sumOfNums <= expectedResultMax;
			}
		});
	};
	
};

export default sum;