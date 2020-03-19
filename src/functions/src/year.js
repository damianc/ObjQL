const year = ObjQL => {

	return (year) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const fullYear = val.getFullYear();
			return year === fullYear;
		});
	};
	
};

export default year;