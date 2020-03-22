const hasProp = ObjQL => {

	return (keyName, value) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			return val.hasOwnProperty(keyName) && val[keyName] === value;
		});
	};

};

export default hasProp;