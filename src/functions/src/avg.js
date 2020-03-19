const avg = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const sumOfNums = val.reduce((a, b) => a + b, 0);
			const average = sumOfNums / val.length;

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return average >= min && average <= max;
			} else {
				return average === expectedResult;
			}
		});
	};
	
};

export default avg;