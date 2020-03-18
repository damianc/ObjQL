const date = ObjQL => {

	return (dateString) => {
		return ObjQL.check((val) => {
			const [day, month, year] = dateString.split('.');
			let matches = true;

			if (val.getDate() != day) matches = false;
			if (val.getMonth() + 1 != month) matches = false;
			if (year && val.getFullYear() != year) matches = false;

			return matches;
		});
	};
	
};

export default date;