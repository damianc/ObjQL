const millisecond = ObjQL => {

	return (millisecond) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _millisecond = val.getMilliseconds();
			
			if (ObjQL.x.isRangeParam(millisecond)) {
				return ObjQL.x.isInRange(_millisecond, millisecond);
			} else {
				return _millisecond === millisecond;
			}
		});
	};
	
};

export default millisecond;