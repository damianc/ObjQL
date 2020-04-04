const is = ObjQL => {

	return (value) => {
		return ObjQL.match((val) => {
			if (typeof val == 'undefined') return;
			
			return Object.is(value, val);
		});
	};
	
};

export default is;