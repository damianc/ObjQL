export const CheckType = {
	EQUAL: Symbol('Check: EQUAL'),
	IN: Symbol('Check: IN'),
	REGEXP: Symbol('Check: REGEXP'),
	BETWEEN: Symbol('Check: BETWEEN')
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

	if (CONSTRUCTOR == 'regexp') {
		return CheckType.REGEXP;
	}

	if (CONSTRUCTOR == 'array' && expected.length == 2 && (expected[0] < expected[1])) {
		return CheckType.BETWEEN;
	}
};