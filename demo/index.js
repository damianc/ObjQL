import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, stuff: ['a', 'aa'], group: 'A', fatherName: 'Luck', points: [1,2,3,4], dob: new Date('4/11/1990 15:30:15.012')},
	{name: 'Adam', age: 42, stuff: ['aa'], group: 'B', points: [1,2,0,4], dob: new Date('10/10/1999')},
	{name: 'Mark', age: 19, stuff: ['a'], group: 'C', fatherName: 'Mark', points: [0,2,3,4], dob: new Date('4/11/1994')},
	{name: 'Joseph', age: 34, group: 'D', points: [1,0,3,4], dob: new Date('1/1/2000')},
	{name: 'Jack', age: 42, group: 'E', points: [1,2,3,0, 44, 42, 24], dob: new Date('12/24/2005')},
	{name: 'Michael', age: 24, group: 'F', points: [3,3,2], dob: new Date('8/16/1980')},
	{name: 'Amadeusz', age: 38, group: 'G', points: [4,4,5,5], dob: new Date('10/20/1980')},
	{name: 'George', age: NaN}
];

const queryable = ObjQL(collection);
const queried = queryable.where({
	points: ObjQL.unique([2,4])
});

console.log(queried);