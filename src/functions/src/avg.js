const avg = ObjQL => {

	return (expectedResult) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const sumOfNums = val.reduce((a, b) => a + b, 0);
			const average = sumOfNums / val.length;

			if (ObjQL.x.isRangeParam(expectedResult)) {
				return ObjQL.x.isInRange(average, expectedResult);
			} else {
				return average === expectedResult;
			}
		});
	};
	
};

export default avg;