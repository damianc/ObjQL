const ref = ObjQL => {

	return (fieldName) => {
		return ObjQL.check((val, rec) => val === rec[fieldName]);
	};

};

export default ref;