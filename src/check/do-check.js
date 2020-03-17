import { CheckType } from './get-check-type';

export const doCheck = function (actual, expected, checkType) {
	switch (checkType) {
		case CheckType.EQUAL:
			return actual === expected;
		case CheckType.IN:
			return expected.has(actual);
		case CheckType.REGEXP:
			return expected.test(actual);
		case CheckType.BETWEEN:
			return actual >= expected[0] && actual <= expected[1];
	}
};