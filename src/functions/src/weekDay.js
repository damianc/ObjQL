const weekDay = ObjQL => {

	return (weekDay) => {
		return ObjQL.check((val) => {
			let weekDayIndex = val.getDay();
			// Sunday is 0 by default
			// we use 7 instead
			if (weekDayIndex === 0) weekDayIndex = 7;

			return weekDay === weekDayIndex;
		});
	};
	
};

export default weekDay;