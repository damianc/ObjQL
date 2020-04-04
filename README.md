# ObjQL

**ObjQL** is a helpful library allowing you to select particular entries from a collection, i.e., an array of objects. An example of code using that is below:

```
const collection = [
	{name: 'Adam', age: 18},
	{name: 'Adam', age: 42},
	{name: 'Mark', age: 19},
	{name: 'Joseph', age: 34},
	{name: 'Jack', age: 42},
	{name: 'Michael', age: 24}
];

const results = ObjQL
	.from(collection)
	.select('*')
	.where({
		age: 18
	})
	.sort('name')
	.limit(2,3);

// => [{name: 'Adam', age: 18}]
```

Currently, the `select()` method only supports `'*'` as a first parameter.  
It will change in one of the future releases.

> Methods must be called in the following order: `select()`, `where()`, `sort()` and `limit()`. The last two may be omitted, however.

## Installation

```
npm i objql-object-query-language
```

## Compound fields

Items in a collection can have additional fields added. To do so, use a callback as a second parameter of the `select()` method.

```
.select('*', item => ({
	desc: `${item.name} being ${item.age} having a ${item.extra}`
}))
```

### Dependencies of compound fields

When some field doesn't have some property, a compound field may have a value that contains `undefined`, what might not be intended.  
  
As a third parameter of the `select()` method, you can pass an array of strings - property names that all must be present in item to add compound properties.

```
.select('*', item => ({
	desc: `${item.name} being ${item.age} having a ${item.extra}`
}), ['name', 'age', 'extra'])
```

## Shortcuts for Functions

| Function | Shortcut |
|----------|----------|
| `{name: ObjQL.equal('John')}` | `{name: 'John'}` |
| `{name: ObjQL.regExp(/^J/)}` | `{name: /^J/}` |
| `group: ObjQL.in(['A', 'B', 'C'])` | `{group: new Set(['A', 'B', 'C'])}` |
| `{age: ObjQL.range(20, 32)}` | `{age: [20, 32]}` |

## Functions

### General

| Function | Purpose | Example |
|----------|---------|---------|
| **equal(value, strict?=true)** | match value that equals another one | `{age: ObjQL.equal('20', false)}` |
| **is(value)** | match value that is equal to another one (uses _Object.is()_) | `{result: ObjQL.is(NaN)}` |
| **in(valuesArray)** | match value that equals one from an array | `{group: ObjQL.in(['A', 'B', 'C', 'D'])}` |
| **range(min, max)** | match value that is from the range _&lt;min;max&gt;_ | `{age: ObjQL.range(15, 25)}` |
| **regExp(re)** | match value that matches to a regular expression | `{name: ObjQL.regExp(/^.A/i)}` |
| **like(pattern)** | match value that matches to a pattern (_%_ means 0+ chars, _\__ means 1 char) | `{name: ObjQL.like('%A_a_')}` |
| **ref(anotherField)** | match value by a value of other field | `{name: ObjQL.ref('fatherName')}` |
| **match(fn)** | match value by a custom condition | `{name: ObjQL.match((val, rec) => val === rec.surname)}` |
| **size(numberOrRange)** | match value by its length or size | `{term: ObjQL.size([20, null])}` |
| **likeArray(valuesArr)** | match value that is an array containing all the values from the array passed to the matcher | `{flags: ObjQL.likeArray(['canWrite', 'canEdit'])}` |

#### The `match()` matcher

A callback passed to the `match()` matcher can accept up to 4 parameters:
* value of a field in a current record
* entire current record
* index of the current record in a entire collection
* entire collection 

```
// get items followed by another item whose
// `result` property is greater than or equal to
// the `result` property of the current item

ObjQL.from(collection)
.select('*')
.where({
	name: ObjQL.match((name, item, idx, coll) => {
		return (
			coll[idx+1] &&
			coll[idx+1].result >= item.result
		);
	})
})
```

### Strings

| Function | Purpose | Example |
|----------|---------|---------|
| **firstChar(char)** | match value by the first character | `{city: ObjQL.firstChar('A')}` |
| **lastChar(char)** | match value by the last character | `{city: ObjQL.lastChar('Z')}` |
| **nthChar(char, position)** | match value by the n-th character | `{city: ObjQL.nthChar('D', 3)}` |
| **startsWith(substr, caseSensitive?=true)** | match value by the beginning | `{city: ObjQL.startsWith('Los')}` |
| **endsWith(substr, caseSensitive?=true)** | match value by the end | `{city: ObjQL.endsWith('os')}` |
| **contains(substr, caseSensitive?=true)** | match value by a substring | `{city: ObjQL.contains('yo')}` |

### Date

Functions used to check a value being an instance of `Date()`.

| Function | Purpose | Example |
|----------|---------|---------|
| **day(dayIndex)** | match value by a day in date | `{birth_date: ObjQL.day(20)}` |
| **month(monthIndex)** | match value by a month in date | `{birth_date: ObjQL.month(12)}` |
| **year(fullYear)** | match value by a full year (e.g., _1998_ rather than _98_) | `{registered: ObjQL.year(2010)}` |
| **hour(hour)** | match value by an hour | `{orders: ObjQL.hour(15)}` |
| **minute(minute)** | match value by a minute | `{orders: ObjQL.minute(30)}` |
| **second(second)** | match value by a second | `{lap: ObjQL.second(10)}` |
| **millisecond(ms)** | match value by a millisecond | `{click: ObjQL.millisecond(12)}` |
| **date(dateFormat, dateValue**) | match value by a date | `{birth_date: ObjQL.date('DD.MM', '14.02')}` |
| **weekDay(weekDayIndex)** | match value by a week day (1=Monday, 7=Sunday) | `{weekend_visits: ObjQL.weekDay(6)}` |

> The `dateFormat` parameter in the `date()` method can consist of the following parts: `YYYY` - full year, `MM` - month, `DD` - day, `HH` - hour, `mm` - minute, `ss` - second.

### Array of Numbers

| Function | Purpose | Example |
|----------|---------|---------|
| **min(numberOrRange)** | match value by minimum value(s) in an array | `{height: ObjQL.min([180, null])}` |
| **max(numberOrRange)** | match value by maximum value(s) in an array | `{weight: ObjQL.max(100)}` |
| **avg(numberOrRange)** | match value by average value(s) of an array | `{test: ObjQL.avg([4, 5])}` |
| **sum(numberOrRange)** | match value by sum of an array items | `{width: ObjQL.sum(24)}` |
| **count(item, numberOrRange)** | match value by a number of item occurencies | `{comment: ObjQL.count('fuc', [null, 3])}` |
| **unique(numberOrRange)** | match value by a number of unique items | `{awards: ObjQL.unique([10, 50])}` |

> *Example ranges*:
> * `count('a', [1, 4])` - a number of occurencies of `a` >= 1 and <= 4
> * `count('a', [2, null])` - a number of occurencies of `a` >= 2
> * `count('a', [null, 5])` - a number of occurencies of `a` <= 5

#### How do `min()`/`max()` work?

```
const collection = ObjQL.from([
	{name: 'John', marks: [3, 4, 6]},
	{name: 'Mark', marks: [2, 3, 5]}
]);



const result = collection.select('*').where({
	marks: ObjQL.min(2)
});
// only Mark has been matched
// John has not as his minimum value is 3

const result2 = collection.select('*').where({
	marks: ObjQL.min([2, 4])
});
// both Mark and John have been matched
// given minimum value is from the range 2-4



const result3 = collection.select('*').where({
	marks: ObjQL.min([null, 2])
});
// only Mark has been matched
// minimum value must be less or equal to 2 [null, 2]

const result4 = collection.select('*').where({
	marks: ObjQL.min([2, null])
});
// both Mark and John have been matched
// minimum value must be greater or equal to 2 [2, null]
```

### Objects

| Function | Purpose | Example |
|----------|---------|---------|
| **hasKey(keyName)** | match object that has a given key | `{config: ObjQL.hasKey('language')}` |
| **hasKeys(keyNamesArr, mode)** | match object that has the given keys: **all** (if `mode` equals `ALL`, it's default value) or **some** (if `mode` equals `SOME`) | `{theme: ObjQL.hasKeys(['color', 'background'], 'SOME')}` |
| **hasValue(value)** | match object that has a given value | `{theme: ObjQL.hasValue('pink')}` |
| **hasValues(valuesArr, mode)** | match object that has the given values, _all_ or _some_ depending on `mode` (`ALL` being default value or `SOME`) | `{config: ObjQL.hasValues(['PL', 'FR'], 'SOME')}` |
| **hasProp(keyName, value)** | match object that has a given key equal to given value | `{theme: ObjQL.hasProp('color', 'red')}` |
| **hasProps(pairArr, mode)** | match object that has the given keys equal to a respective value (depending on `mode`: `ALL` (default) or `SOME`) | `{config: ObjQL.hasProps([['language', 'PL'], ['location', 'Poland']])}` |

### Types

| Function | Purpose | Example |
|----------|---------|---------|
| **isType(type)** | match value by the type (_uses Object#toString(), matching is case insensitive_) | `{pattern: ObjQL.isType('regexp')}` |
| **isInstanceOf(klazz)** | match value that is instance of the given class | `{publishedAt: ObjQL.isInstanceOf(Date)}` |
| **isNull()** | match value that equals `null` | `{projects: ObjQL.isNull()}` |
| **isUndefined()** | match value that is undefined | `{dob: ObjQL.isUndefined()}` |
| **isTruthy()** | match value that is _truthy_ | `{results: ObjQL.isTruthy()}` |
| **isFalsy()** | match value that is _falsy_ | `{skills: ObjQL.isFalsy()}` |
| **isInteger()** | match value that is an integer | `{progress: ObjQL.isInteger()}` |
| **isFloat()** | match value that is a float | `{average: ObjQL.isFloat()}` |