const isType = ObjQL => {

	return (type) => {
		return ObjQL.check((val) => {
			const detectedType = Object.prototype.toString.call(val);
			const [, actualType] = detectedType.match(/\[object\s(\w+)\]/);

			return actualType && type.toLowerCase() == actualType.toLowerCase();
		});
	};
	
};

export default isType;