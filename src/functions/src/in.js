const _in = ObjQL => {

	return (value) => {
		return ObjQL.check((val) => {
			return value.includes(val);
		});
	};
	
};

export default _in;