const hour = ObjQL => {

	return (hour) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const _hour = val.getHours();

			if (ObjQL.x.isRangeParam(hour)) {
				return ObjQL.x.isInRange(_hour, hour);
			} else {
				return _hour === hour;
			}
		});
	};
	
};

export default hour;