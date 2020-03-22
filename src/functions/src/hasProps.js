const hasProps = ObjQL => {

	return (pairArr, checkMode = 'ALL') => {
		return ObjQL.check((val) => {
			if (!val) return;

			let pairsNumber = 0;
			pairArr.forEach(pair => {
				if (val.hasOwnProperty(pair[0]) && val[pair[0]] === pair[1]) {
					pairsNumber += 1;
				}
			});

			if (checkMode == 'ALL') {
				return pairArr.length === pairsNumber;
			} else if (checkMode == 'SOME') {
				return pairsNumber >= 1;
			}
		});
	};

};

export default hasProps;