const hasValue = ObjQL => {

	return (value) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const values = Object.values(val);
			return values.includes(value);
		});
	};

};

export default hasValue;