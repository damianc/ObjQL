const hasValues = ObjQL => {

	return (valuesArr, checkMode = 'ALL') => {
		return ObjQL.match((val) => {
			if (!val) return;

			const values = Object.values(val);
			let valuesNumber = 0;

			valuesArr.forEach(value => {
				if (values.includes(value)) {
					valuesNumber += 1;
				}
			});

			if (checkMode == 'ALL') {
				return valuesArr.length === valuesNumber;
			} else if (checkMode == 'SOME') {
				return valuesNumber >= 1;
			}
		});
	};

};

export default hasValues;