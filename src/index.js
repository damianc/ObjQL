import QueryableArray from './queryable-array';
import functions from './functions';

function ObjQL(arr) {
	return new QueryableArray(...arr);
}

ObjQL.check = fn => {
	fn.isChecker = true;
	return fn;
};

ObjQL.extend = (functionName, functionFactory) => {
	if (functionName == '_in') functionName = 'in';
	ObjQL[functionName] = functionFactory(ObjQL);
};

let fnEntries = Object.entries(functions);
fnEntries.forEach(([name, cb]) => ObjQL.extend(name, cb));

export default ObjQL;