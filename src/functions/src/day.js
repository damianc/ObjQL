const day = ObjQL => {

	return (day) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const dayIndex = val.getDate();
			return day === dayIndex;
		});
	};
	
};

export default day;