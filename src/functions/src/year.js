const year = ObjQL => {

	return (year) => {
		return ObjQL.check((val) => {
			const fullYear = val.getFullYear();

			return year === fullYear;
		});
	};
	
};

export default year;