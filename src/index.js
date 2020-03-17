import QueryableArray from './queryable-array';

function ObjQL(arr) {
	return new QueryableArray(...arr);
}

ObjQL.check = fn => {
	fn.isChecker = true;
	return fn;
};

ObjQL.firstChar = expectedChar => {
	return ObjQL.check((val) => val[0] === expectedChar);
};
ObjQL.lastChar = expectedChar => {
	return ObjQL.check((val) => val.slice(-1)[0] === expectedChar);
};
ObjQL.nthChar = (expectedChar, charPosition) => {
	return ObjQL.check((val) => val[charPosition] === expectedChar);
};

export default ObjQL;