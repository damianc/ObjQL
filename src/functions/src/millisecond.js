const millisecond = ObjQL => {

	return (millisecond) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			const _millisecond = val.getMilliseconds();
			
			if (ObjQL.x.isRangeParam(millisecond)) {
				return ObjQL.x.isInRange(_millisecond, millisecond);
			} else {
				return _millisecond == millisecond;
			}
		});
	};
	
};

export default millisecond;