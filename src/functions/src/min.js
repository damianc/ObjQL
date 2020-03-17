const min = ObjQL => {

	return (expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			const minOfNums = Math.min(...val);

			if (expectedResultMax === null) {
				return minOfNums === expectedResult;
			} else {
				return minOfNums >= expectedResult && minOfNums <= expectedResultMax;
			}
		});
	};
	
};

export default min;