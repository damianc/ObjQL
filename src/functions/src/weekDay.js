const weekDay = ObjQL => {

	return (weekDay) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			let weekDayIndex = val.getDay();
			// Sunday is 0 by default
			// we use 7 instead
			if (weekDayIndex === 0) weekDayIndex = 7;

			if (typeof weekDay != 'number') {
				let date = ObjQL.x.parseDate(weekDay);
				weekDay = date.getDay();
				if (weekDay === 0) weekDay = 7;
			}
			
			if (ObjQL.x.isRangeParam(weekDay)) {
				return ObjQL.x.isInRange(weekDayIndex, weekDay);
			} else {
				return weekDayIndex === weekDay;
			}
		});
	};
	
};

export default weekDay;