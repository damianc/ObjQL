const _in = ObjQL => {

	return (value) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return value.includes(val);
		});
	};
	
};

export default _in;