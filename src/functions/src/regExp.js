const regExp = ObjQL => {

	return (re) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return re.test(val);
		});
	};
	
};

export default regExp;