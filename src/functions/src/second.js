const second = ObjQL => {

	return (second) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _second = val.getSeconds();
			return second === _second;
		});
	};
	
};

export default second;