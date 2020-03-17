export const CheckType = {
	EQUAL: Symbol('Check: EQUAL')
};

export const doCheck = function (actual, expected, checkType) {
	switch (checkType) {
		case CheckType.EQUAL:
			return actual === expected;
	}
}

export const getCheckType = function (expected) {
	if (typeof expected == 'string' || typeof expected == 'number') {
		return CheckType.EQUAL;
	}
}