const isInstanceOf = ObjQL => {

	return (klazz) => {
		return ObjQL.match((val) => {
			return val instanceof klazz;
		});
	};
	
};

export default isInstanceOf;