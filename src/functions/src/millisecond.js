const millisecond = ObjQL => {

	return (millisecond) => {
		return ObjQL.check((val) => {
			const _millisecond = val.getMilliseconds();

			return millisecond === _millisecond;
		});
	};
	
};

export default millisecond;