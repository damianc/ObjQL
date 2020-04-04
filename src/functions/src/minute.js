const minute = ObjQL => {

	return (minute) => {
		return ObjQL.match((val) => {
			if (!val) return;

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