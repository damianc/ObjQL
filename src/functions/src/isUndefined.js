const isUndefined = ObjQL => {

	return () => {
		return ObjQL.match((val) => {
			return typeof val == 'undefined';
		});
	};
	
};

export default isUndefined;