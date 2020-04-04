const like = ObjQL => {

	return (pattern) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const reString = pattern.replace(/\%/g, '[\\w\\W]*').replace(/\_/g, '.');
			const regExp = new RegExp(reString);
			return regExp.test(val);
		});
	};
	
};

export default like;