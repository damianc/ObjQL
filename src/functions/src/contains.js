const contains = ObjQL => {

	return (substr, caseSensitive = true) => {
		return ObjQL.check((val) => {
			const _substr = caseSensitive ? substr : substr.toLowerCase();
			const _val = caseSensitive ? val : val.toLowerCase();

			return _val.indexOf(_substr) !== -1;
		});
	};

};

export default contains;