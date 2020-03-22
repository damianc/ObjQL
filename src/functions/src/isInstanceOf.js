const isInstanceOf = ObjQL => {

	return (klazz) => {
		return ObjQL.check((val) => {
			return val instanceof klazz;
		});
	};
	
};

export default isInstanceOf;