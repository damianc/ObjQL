const isTruthy = ObjQL => {

	return () => {
		return ObjQL.check((val) => {
			return !!val;
		});
	};
	
};

export default isTruthy;