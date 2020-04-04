const hasProp = ObjQL => {

	return (keyName, value) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			return val.hasOwnProperty(keyName) && val[keyName] === value;
		});
	};

};

export default hasProp;