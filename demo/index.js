import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, group: 'A', fatherName: 'Luck', points: [1,2,3,4]},
	{name: 'Adam', age: 42, group: 'B', points: [1,2,0,4]},
	{name: 'Mark', age: 19, group: 'C', fatherName: 'Mark', points: [0,2,3,4]},
	{name: 'Joseph', age: 34, group: 'D', points: [1,0,3,4]},
	{name: 'Jack', age: 42, group: 'E', points: [1,2,3,0]},
	{name: 'Michael', age: 24, group: 'F', points: [3,3,2]},
	{name: 'Amadeusz', age: 38, group: 'G', points: [4,4,5,5]}
];

const queryable = ObjQL(collection);
const queried = queryable.where({
	points: ObjQL.min(2)
});

console.log(queried);