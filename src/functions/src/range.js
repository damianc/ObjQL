const range = ObjQL => {

	return (min, max) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return val >= min && val <= max;
		});
	};
	
};

export default range;