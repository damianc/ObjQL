const isFloat = ObjQL => {

	return () => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			let fractionPart = val.toString().split('.')[1];
			return typeof fractionPart != 'undefined';
		});
	};
	
};

export default isFloat;