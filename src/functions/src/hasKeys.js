const hasKeys = ObjQL => {

	return (keysNamesArr, checkMode = 'ALL') => {
		return ObjQL.match((val) => {
			if (!val) return;

			let keysNumber = 0;
			keysNamesArr.forEach(keyName => {
				if (val.hasOwnProperty(keyName)) {
					keysNumber += 1;
				}
			});

			if (checkMode == 'ALL') {
				return keysNamesArr.length === keysNumber;
			} else if (checkMode == 'SOME') {
				return keysNumber >= 1;
			}
		});
	};

};

export default hasKeys;