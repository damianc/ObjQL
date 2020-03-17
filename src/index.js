import QueryableArray from './queryable-array';

export default function ObjQL(arr) {
	return new QueryableArray(...arr);
}