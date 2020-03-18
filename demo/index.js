import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, group: 'A', fatherName: 'Luck', points: [1,2,3,4], dob: new Date('4/11/1990')},
	{name: 'Adam', age: 42, group: 'B', points: [1,2,0,4], dob: new Date('10/10/1999')},
	{name: 'Mark', age: 19, group: 'C', fatherName: 'Mark', points: [0,2,3,4], dob: new Date('4/11/1994')},
	{name: 'Joseph', age: 34, group: 'D', points: [1,0,3,4], dob: new Date('1/1/2000')},
	{name: 'Jack', age: 42, group: 'E', points: [1,2,3,0], dob: new Date('12/24/2005')},
	{name: 'Michael', age: 24, group: 'F', points: [3,3,2], dob: new Date('8/16/1980')},
	{name: 'Amadeusz', age: 38, group: 'G', points: [4,4,5,5], dob: new Date('10/20/1980')}
];

const queryable = ObjQL(collection);
const queried = queryable.where({
	dob: ObjQL.date('11.04')
});

console.log(queried);