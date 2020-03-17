const nthChar = ObjQL => {

	return (expectedChar, charPosition) => {
		return ObjQL.check((val) => val[charPosition] === expectedChar);
	};
	
};

export default nthChar;