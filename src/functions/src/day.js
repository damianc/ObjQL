const day = ObjQL => {

	return (day) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const dayIndex = val.getDate();
			return day === dayIndex;
		});
	};
	
};

export default day;