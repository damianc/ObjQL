const firstChar = ObjQL => {

	return (expectedChar) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return val[0] === expectedChar;
		});
	};

};

export default firstChar;