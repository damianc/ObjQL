const endsWith = ObjQL => {

	return (substr, caseSensitive = true) => {
		return ObjQL.check((val) => {
			if (!val) return;
			
			const _substr = caseSensitive ? substr : substr.toLowerCase();
			const _val = caseSensitive ? val : val.toLowerCase();
			return _val.slice(-_substr.length) === _substr;
		});
	};
	
};

export default endsWith;