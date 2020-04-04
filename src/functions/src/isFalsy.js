const isFalsy = ObjQL => {

	return () => {
		return ObjQL.match((val) => {
			return !val;
		});
	};
	
};

export default isFalsy;