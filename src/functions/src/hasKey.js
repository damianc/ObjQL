const hasKey = ObjQL => {

	return (keyName) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return val.hasOwnProperty(keyName);
		});
	};

};

export default hasKey;