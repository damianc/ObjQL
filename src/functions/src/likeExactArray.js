const  likeExactArray = ObjQL => {

	return (expectedResult) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			let matchedItems = 0;
			expectedResult.forEach(expected => {
				if (val.includes(expected)) {
					matchedItems += 1;
				}
			});

			return expectedResult.length === matchedItems && val.length === matchedItems;
		});
	};
	
};

export default likeExactArray;