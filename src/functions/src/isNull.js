const isNull = ObjQL => {

	return () => {
		return ObjQL.match((val) => {
			return val === null;
		});
	};
	
};

export default isNull;