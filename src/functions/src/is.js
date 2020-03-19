const is = ObjQL => {

	return (value) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return Object.is(value, val);
		});
	};
	
};

export default is;