const like = ObjQL => {

	return (pattern) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const reString = pattern.replace(/\%/g, '[\\w\\W]*').replace(/\_/g, '.');
			const regExp = new RegExp(reString);
			return regExp.test(val);
		});
	};
	
};

export default like;