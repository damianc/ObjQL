const month = ObjQL => {

	return (month) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			const monthIndex = val.getMonth() + 1;
			
			if (ObjQL.x.isRangeParam(month)) {
				return ObjQL.x.isInRange(monthIndex, month);
			} else {
				return monthIndex === month;
			}
		});
	};
	
};

export default month;