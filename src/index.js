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

ObjQL.x = {
	isRangeParam(param) {
		return (
			Array.isArray(param) && param.length == 2 && (
				(param[0] < param[1]) ||
				(param[0] == null && param[1] != null) ||
				(param[0] != null && param[1] == null)
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
			// YYYY-MM-DD HH:mm:ss.uuuu
			let format1 = /(\d{4})\-(\d{1,2})\-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
			// DD.MM.YYYY HH:mm:ss.uuuu
			let format2 = /(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?:\:(\d{1,2})(?:\.(\d{1,3}))?)?)?/;
			// MM/DD/YYYY HH:mm:ss.uuuu
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
				if (idx != 6 && p.length == 1) {
					return ('0' + p);
				}
				return p;
			});

			return new Date(...dateParts);
		}

		if (typeof input == 'number') {
			return new Date(input);
		}
	}
};

export default ObjQL;