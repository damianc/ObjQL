const hasKey = ObjQL => {

	return (keyName) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return val.hasOwnProperty(keyName);
		});
	};

};

export default hasKey;