const day = ObjQL => {

	return (day) => {
		return ObjQL.match((_val) => {
			if (!_val) return;
			
			const val = ObjQL.x.parseDate(_val);
			const dayIndex = val.getDate();

			if (typeof day != 'number') {
				let date = ObjQL.x.parseDate(day);
				day = date.getDate();
			}

			if (ObjQL.x.isRangeParam(day)) {
				return ObjQL.x.isInRange(dayIndex, day);
			} else {
				return dayIndex === day;
			}
		});
	};
	
};

export default day;