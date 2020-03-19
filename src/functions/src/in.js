const _in = ObjQL => {

	return (value) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return value.includes(val);
		});
	};
	
};

export default _in;