const month = ObjQL => {

	return (month) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const monthIndex = val.getMonth() + 1;
			return month === monthIndex;
		});
	};
	
};

export default month;