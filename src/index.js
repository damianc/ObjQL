import QueryableArray from './queryable-array';

function ObjQL(arr) {
	return new QueryableArray(...arr);
}

ObjQL.check = fn => {
	fn.isChecker = true;
	return fn;
};

export default ObjQL;