const  likeExactArray = ObjQL => {

	return (expectedResult, checkIndexes = false) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			let matchedItems = 0;
			expectedResult.forEach((expected, idx) => {
				// if (!checkIndexes && val.includes(expected)) {
				// 	matchedItems += 1;
				// } else if (checkIndexes && expectedResult[idx] === val[idx]) {
				// 	matchedItems += 1;
				// }
				if (
					(!checkIndexes && val.includes(expected)) ||
					(checkIndexes && expectedResult[idx] === val[idx])
				) {
					matchedItems += 1;
				}
			});

			return expectedResult.length === matchedItems && val.length === matchedItems;
		});
	};
	
};

export default likeExactArray;