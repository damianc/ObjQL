const second = ObjQL => {

	return (second) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _second = val.getSeconds();
			
			if (ObjQL.x.isRangeParam(second)) {
				return ObjQL.x.isInRange(_second, second);
			} else {
				return _second === second;
			}
		});
	};
	
};

export default second;