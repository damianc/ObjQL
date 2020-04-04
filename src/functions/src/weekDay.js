const weekDay = ObjQL => {

	return (weekDay) => {
		return ObjQL.match((val) => {
			if (!val) return;

			let weekDayIndex = val.getDay();
			// Sunday is 0 by default
			// we use 7 instead
			if (weekDayIndex === 0) weekDayIndex = 7;
			
			if (ObjQL.x.isRangeParam(weekDay)) {
				return ObjQL.x.isInRange(weekDayIndex, weekDay);
			} else {
				return weekDayIndex === weekDay;
			}
		});
	};
	
};

export default weekDay;