const minute = ObjQL => {

	return (minute) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			const _minute = val.getMinutes();

			if (ObjQL.x.isRangeParam(minute)) {
				return ObjQL.x.isInRange(_minute, minute);
			} else {
				return _minute === minute;
			}
		});
	};
	
};

export default minute;