const max = ObjQL => {

	return (expectedResult) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const maxOfNums = Math.max(...val);

			if (ObjQL.x.isRangeParam(expectedResult)) {
				const [min, max] = expectedResult;
				return maxOfNums >= min && maxOfNums <= max;
			} else {
				return maxOfNums === expectedResult;
			}
		});
	};
	
};

export default max;