const regExp = ObjQL => {

	return (re) => {
		return ObjQL.check((val) => {
			return re.test(val);
		});
	};
	
};

export default regExp;