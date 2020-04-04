const startsWith = ObjQL => {

	return (substr, caseSensitive = true) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _substr = caseSensitive ? substr : substr.toLowerCase();
			const _val = caseSensitive ? val : val.toLowerCase();
			return _val.slice(0, _substr.length) === _substr;
		});
	};

};

export default startsWith;