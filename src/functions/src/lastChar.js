const lastChar = ObjQL => {

	return (expectedChar) => {
		return ObjQL.check((val) => val.slice(-1)[0] === expectedChar);
	};
	
};

export default lastChar;