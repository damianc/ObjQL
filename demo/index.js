import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, group: 'A'},
	{name: 'Adam', age: 42, group: 'B'},
	{name: 'Mark', age: 19, group: 'C'},
	{name: 'Joseph', age: 34, group: 'D'},
	{name: 'Jack', age: 42, group: 'E'},
	{name: 'Michael', age: 24, group: 'F'}
];

const queryable = ObjQL(collection);
const queried = queryable.where({
	name: /a/
});

console.log(queried);