const ref = ObjQL => {

	return (fieldName) => {
		return ObjQL.match((val, rec) => {
			if (!val) return;
			
			return val === rec[fieldName];
		});
	};

};

export default ref;