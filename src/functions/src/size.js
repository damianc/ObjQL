const size = ObjQL => {

	return (givenSize) => {
		return ObjQL.match((val) => {
			if (!val) return;
			let len;

			if (val && val.length) len = val.length;
			else if (val && val.size) len = val.size;

			if (ObjQL.x.isRangeParam(givenSize)) {
				return ObjQL.x.isInRange(len, givenSize);
			} else {
				return len === givenSize;
			}
		});
	};

};

export default size;