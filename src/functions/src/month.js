const month = ObjQL => {

	return (month) => {
		return ObjQL.match((val) => {
			if (!val) return;

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