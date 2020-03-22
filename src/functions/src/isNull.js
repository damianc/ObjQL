const isNull = ObjQL => {

	return () => {
		return ObjQL.check((val) => {
			return val === null;
		});
	};
	
};

export default isNull;