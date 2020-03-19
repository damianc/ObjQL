const is = ObjQL => {

	return (value) => {
		return ObjQL.check((val) => {
			return Object.is(value, val);
		});
	};
	
};

export default is;