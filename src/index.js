import QueryableArray from './queryable-array';

function ObjQL(arr) {
	return new QueryableArray(...arr);
}

ObjQL.check = fn => {
	fn.isChecker = true;
	return fn;
};

ObjQL.firstChar = (expectedChar) => {
	return ObjQL.check((val) => val[0] === expectedChar);
};
ObjQL.lastChar = (expectedChar) => {
	return ObjQL.check((val) => val.slice(-1)[0] === expectedChar);
};
ObjQL.nthChar = (expectedChar, charPosition) => {
	return ObjQL.check((val) => val[charPosition] === expectedChar);
};

ObjQL.startsWith = (substr, caseSensitive = true) => {
	return ObjQL.check((val) => {
		const _substr = caseSensitive ? substr : substr.toLowerCase();
		const _val = caseSensitive ? val : val.toLowerCase();

		return _val.slice(0, _substr.length) === _substr;
	});
};
ObjQL.endsWith = (substr, caseSensitive = true) => {
	return ObjQL.check((val) => {
		const _substr = caseSensitive ? substr : substr.toLowerCase();
		const _val = caseSensitive ? val : val.toLowerCase();

		return _val.slice(-_substr.length) === _substr;
	});
};
ObjQL.contains = (substr, caseSensitive = true) => {
	return ObjQL.check((val) => {
		const _substr = caseSensitive ? substr : substr.toLowerCase();
		const _val = caseSensitive ? val : val.toLowerCase();

		return _val.indexOf(_substr) !== -1;
	});
};

ObjQL.ref = (fieldName) => {
	return ObjQL.check((val, rec) => val === rec[fieldName]);
};

export default ObjQL;