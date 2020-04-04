const contains = ObjQL => {

	return (substr, caseSensitive = true) => {
		return ObjQL.match((val) => {
			if (!val) return;
			
			const _substr = caseSensitive ? substr : substr.toLowerCase();
			const _val = caseSensitive ? val : val.toLowerCase();
			return _val.indexOf(_substr) !== -1;
		});
	};

};

export default contains;