const day = ObjQL => {

	return (day) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const dayIndex = val.getDate();

			if (ObjQL.x.isRangeParam(day)) {
				return ObjQL.x.isInRange(dayIndex, day);
			} else {
				return dayIndex === day;
			}
		});
	};
	
};

export default day;