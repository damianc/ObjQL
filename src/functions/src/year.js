const year = ObjQL => {

	return (year) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const fullYear = val.getFullYear();
			
			if (ObjQL.x.isRangeParam(year)) {
				return ObjQL.x.isInRange(fullYear, year);
			} else {
				return fullYear === year;
			}
		});
	};
	
};

export default year;