const hour = ObjQL => {

	return (hour) => {
		return ObjQL.match((_val) => {
			if (!_val) return;
			const val = ObjQL.x.parseDate(_val);
			
			const _hour = val.getHours();

			if (ObjQL.x.isRangeParam(hour)) {
				return ObjQL.x.isInRange(_hour, hour);
			} else {
				return _hour === hour;
			}
		});
	};
	
};

export default hour;