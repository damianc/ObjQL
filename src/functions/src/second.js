const second = ObjQL => {

	return (second) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			const _second = val.getSeconds();

			if (typeof second != 'number') {
				let date = ObjQL.x.parseDate(second);
				second = date.getSeconds();
			}
			
			if (ObjQL.x.isRangeParam(second)) {
				return ObjQL.x.isInRange(_second, second);
			} else {
				return _second === second;
			}
		});
	};
	
};

export default second;