const equal = ObjQL => {

	return (value, strict = true) => {
		return ObjQL.check((val) => {
			if (strict === true) {
				return value === val;
			} else {
				return value == val;
			}
		});
	};
	
};

export default equal;