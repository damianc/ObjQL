const millisecond = ObjQL => {

	return (millisecond) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _millisecond = val.getMilliseconds();
			return millisecond === _millisecond;
		});
	};
	
};

export default millisecond;