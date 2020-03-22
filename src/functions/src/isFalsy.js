const isFalsy = ObjQL => {

	return () => {
		return ObjQL.check((val) => {
			return !val;
		});
	};
	
};

export default isFalsy;