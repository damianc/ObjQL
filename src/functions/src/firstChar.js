const firstChar = ObjQL => {

	return (expectedChar) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return val[0] === expectedChar;
		});
	};

};

export default firstChar;