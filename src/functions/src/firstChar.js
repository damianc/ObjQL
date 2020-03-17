const firstChar = ObjQL => {

	return (expectedChar) => {
		return ObjQL.check((val) => val[0] === expectedChar);
	};

};

export default firstChar;