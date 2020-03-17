const max = ObjQL => {

	return (expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			const maxOfNums = Math.max(...val);

			if (expectedResultMax === null) {
				return maxOfNums === expectedResult;
			} else {
				return maxOfNums >= expectedResult && maxOfNums <= expectedResultMax;
			}
		});
	};
	
};

export default max;