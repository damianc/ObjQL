const lastChar = ObjQL => {

	return (expectedChar) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return val.slice(-1)[0] === expectedChar;
		});
	};
	
};

export default lastChar;