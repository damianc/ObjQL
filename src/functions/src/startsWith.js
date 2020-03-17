const startsWith = ObjQL => {

	return (substr, caseSensitive = true) => {
		return ObjQL.check((val) => {
			const _substr = caseSensitive ? substr : substr.toLowerCase();
			const _val = caseSensitive ? val : val.toLowerCase();

			return _val.slice(0, _substr.length) === _substr;
		});
	};

};

export default startsWith;