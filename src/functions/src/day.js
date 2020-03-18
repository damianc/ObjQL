const day = ObjQL => {

	return (day) => {
		return ObjQL.check((val) => {
			const dayIndex = val.getDate();

			return day === dayIndex;
		});
	};
	
};

export default day;