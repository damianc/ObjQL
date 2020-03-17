import { CheckType } from './get-check-type';

export const doCheck = function (actual, expected, checkType) {
	switch (checkType) {
		case CheckType.EQUAL:
			return actual === expected;
		case CheckType.IN:
			return expected.has(actual);
	}
};