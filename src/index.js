import { QueryableCollection } from './collections';
import functions from './functions';

function ObjQL() {}

ObjQL.from = arr => {
	return new QueryableCollection(arr);
};

ObjQL.match = fn => {
	fn.isMatcher = true;
	return fn;
};

ObjQL.extend = (functionName, functionFactory) => {
	if (functionName == '_in') functionName = 'in';
	ObjQL[functionName] = functionFactory(ObjQL);
};

let fnEntries = Object.entries(functions);
fnEntries.forEach(([name, cb]) => ObjQL.extend(name, cb));

Object.defineProperty(ObjQL, 'CURRENT', {
	get() {
		return new Date();
	}
});

ObjQL.x = {
	isRangeParam(param) {
		if (!Array.isArray(param)) return;
		let [b, e] = param;

		return (
			param.length == 2 && (
				(
					(typeof b == 'number' && typeof e == 'number') &&
					(
						(b < e) ||
						(b == null && e != null) ||
						(b != null && e == null)
					)
				) || (
					(typeof b == 'string' || typeof b == 'number' || (b.constructor && b.constructor.name == 'Date')) &&
					(typeof e == 'string' || typeof e == 'number' || (e.constructor && e.constructor.name == 'Date'))
				)
			)
		);
	},
	isInRange(value, [min, max]) {
		if (min == null && max != null) return value <= max;
		if (min != null && max == null) return value >= min;
		return value >= min && value <= max;
	},
	parseDate(input) {
		if (input && input.constructor.name == 'Date') {
			return input;
		}

		if (typeof input == 'string') {
			// YYYY-MM-DD HH:mm:ss.uuu
			let format1 = /(\d{4})\-(\d{1,2})\-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
			// DD.MM.YYYY HH:mm:ss.uuu
			let format2 = /(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
			// MM/DD/YYYY HH:mm:ss.uuu
			let format3 = /(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;

			let year, month, day;
			let hour, minute, second, millisecond;

			if (format1.test(input)) {
				let matches = input.match(format1);
				if (matches == null) return;
				[, year, month, day, hour, minute, second, millisecond] = matches;
			} else if (format2.test(input)) {
				let matches = input.match(format2);
				if (matches == null) return;
				[, day, month, year, hour, minute, second, millisecond] = matches;
			} else if (format3.test(input)) {
				let matches = input.match(format3);
				if (matches == null) return;
				[, month, day, year, hour, minute, second, millisecond] = matches;
			}

			let _month = parseInt(month) - 1;
			let dateParts = [year, _month, day];

			if (hour && minute) dateParts.push(hour, minute);
			if (second) dateParts.push(second);
			if (millisecond) dateParts.push(millisecond);

			dateParts = dateParts.map((p, idx) => {
				if (idx !== 6 && p.length === 1) {
					return '0' + p;
				}
				return p;
			});

			return new Date(...dateParts);
		}

		if (typeof input == 'number') {
			return new Date(input);
		}
	},
	isDateInput(input) {
		// YYYY-MM-DD HH:mm:ss.uuu
		let format1 = /(\d{4})\-(\d{1,2})\-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
		// DD.MM.YYYY HH:mm:ss.uuu
		let format2 = /(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
		// MM/DD/YYYY HH:mm:ss.uuu
		let format3 = /(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;

		return (
			typeof input == 'number' || (input.constructor && input.constructor.name == 'Date') || (
				typeof input == 'string' && (
					format1.test(input) ||
					format2.test(input) ||
					format3.test(input)
				)
			)
		);
	}
};

export default ObjQL;