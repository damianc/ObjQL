const regExp = ObjQL => {

	return (re) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return re.test(val);
		});
	};
	
};

export default regExp;