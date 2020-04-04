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
	}
};

export default ObjQL;