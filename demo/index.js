import ObjQL from '../prod/objql';

const collection = [
	{name: 'Adam', age: 18, admin: true, stuff: ['a', 'aa'], group: 'A', fatherName: 'Luck', points: [1,2,3,4], dob: '4/11/1990 15:30:15.012'},
	{name: 'Adam', age: 42.0005, admin: false, stuff: ['aa'], group: 'B', points: [1,2,0,4], dob: '1990-10-10 15:45:30.120'},
	{name: 'Mark', age: 19, stuff: ['a'], group: 'C', fatherName: 'Mark', points: [0,2,3,4], dob: '1994-4-11 13:35:20'},
	{name: 'Joseph', age: 34, group: 'D', points: [1,0,3,4], dob: new Date('1/1/2000')},
	{name: 'Jack', age: 42, group: 'E', points: [1,2,3,0, 44, 42, 24], dob: new Date('4/5/2005')},
	{name: 'Michael', age: 24, group: 'F', points: [3,3,2], dob: new Date('8/16/1980')},
	{name: 'Amadeusz', age: 38, group: 'G', points: [4,4,5,5], dob: new Date('10/20/1980')},
	{name: 'George', age: NaN, obj: {a: 1, b: 2}, extra: [1, 2]},
	{name: 'Manville', age: null, obj: {a: 1, c: 3}, extra: /abc/}
];

const queryable = ObjQL.from(collection);
const queried = queryable
.select('*', item => ({
	desc: `${item.name} being ${item.age} having a ${item.extra}`
}), ['name', 'age', 'extra'])
.where({
	dob: ObjQL.date('MM DD', ObjQL.CURRENT)
})
// .sort('name')
// .limit(2, 4);

console.log(queried);