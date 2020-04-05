const year = ObjQL => {

	return (year) => {
		return ObjQL.match((_val) => {
			if (typeof _val == 'undefined') return;

			const val = ObjQL.x.parseDate(_val);
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