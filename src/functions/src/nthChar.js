const nthChar = ObjQL => {

	return (expectedChar, charPosition) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return val[charPosition] === expectedChar;
		});
	};
	
};

export default nthChar;