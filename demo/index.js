import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, group: 'A', fatherName: 'Luck'},
	{name: 'Adam', age: 42, group: 'B'},
	{name: 'Mark', age: 19, group: 'C', fatherName: 'Mark'},
	{name: 'Joseph', age: 34, group: 'D'},
	{name: 'Jack', age: 42, group: 'E'},
	{name: 'Michael', age: 24, group: 'F'},
	{name: 'Amadeusz', age: 38, group: 'G'}
];

const queryable = ObjQL(collection);
const queried = queryable.where({
	name: ObjQL.contains('pH', false)
});

console.log(queried);