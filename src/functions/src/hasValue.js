const hasValue = ObjQL => {

	return (value) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const values = Object.values(val);
			return values.includes(value);
		});
	};

};

export default hasValue;