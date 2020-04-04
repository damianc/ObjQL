const hour = ObjQL => {

	return (hour) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const _hour = val.getHours();
			return hour === _hour;
		});
	};
	
};

export default hour;