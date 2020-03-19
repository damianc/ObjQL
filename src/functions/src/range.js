const range = ObjQL => {

	return (min, max) => {
		return ObjQL.check((val) => {
			return val >= min && val <= max;
		});
	};
	
};

export default range;