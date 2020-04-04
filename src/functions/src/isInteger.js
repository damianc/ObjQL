const isInteger = ObjQL => {

	return () => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return Math.round(val) === val;
		});
	};
	
};

export default isInteger;