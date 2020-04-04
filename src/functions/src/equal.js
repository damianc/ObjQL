const equal = ObjQL => {

	return (value, strict = true) => {
		return ObjQL.match((val) => {			
			if (strict === true) {
				return value === val;
			} else {
				return value == val;
			}
		});
	};
	
};

export default equal;