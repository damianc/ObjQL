export const CheckType = {
	EQUAL: Symbol('Check: EQUAL'),
	IN: Symbol('Check: IN')
};

export const getCheckType = function (expected) {
	const TYPE = typeof expected;
	const CONSTRUCTOR = expected.constructor && expected.constructor.name.toLowerCase();

	if (TYPE == 'string' || TYPE == 'number') {
		return CheckType.EQUAL;
	}

	if (CONSTRUCTOR == 'set') {
		return CheckType.IN;
	}
};