const isUndefined = ObjQL => {

	return () => {
		return ObjQL.check((val) => {
			return typeof val == 'undefined';
		});
	};
	
};

export default isUndefined;