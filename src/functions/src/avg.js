const avg = ObjQL => {

	return (expectedResult, expectedResultMax = null) => {
		return ObjQL.check((val) => {
			const sumOfNums = val.reduce((a, b) => a + b, 0);
			const average = sumOfNums / val.length;

			if (expectedResultMax === null) {
				return average === expectedResult;
			} else {
				return average >= expectedResult && average <= expectedResultMax;
			}
		});
	};
	
};

export default avg;