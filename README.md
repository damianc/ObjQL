![npm](https://img.shields.io/npm/v/objql-object-query-language)

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

> Methods must be called in the following order: `from()`, `select()`, `where()`, `sort()` and `limit()`. The last two may be omitted, however.

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

* General
	* [`equal()`](#equalvalue-stricttrue)
	* [`is()`](#isvalue)
	* [`in()`](#invaluesarray)
	* [`range()`](#rangemin-max)
	* [`regExp()`](#regexpre)
	* [`like()`](#likepattern)
	* [`ref()`](#refanotherfield)
	* [`size()`](#sizenumberorrange)
	* [`likeArray()`](#likearrayvaluesarr)
	* [`likeExactArray()`](#likeexactarrayvaluesarr-checkindexesfalse)
* Strings
	* [`firstChar()`](#firstcharchar)
	* [`lastChar()`](#lastcharchar)
	* [`nthChar()`](#nthcharchar-position)
	* [`startsWith()`](#startswithsubstr-casesensitivetrue)
	* [`endsWith()`](#endswithsubstr-casesensitivetrue)
	* [`contains()`](#containssubstr-casesensitivetrue)
* Date
	* [`year()`](#yearfullyearorrange)
	* [`month()`](#monthmonthindexorrange)
	* [`day()`](#daydayindexorrange)
	* [`weekDay()`](#weekdayweekdayindexorrange)
	* [`hour()`](#hourhourorrange)
	* [`minute()`](#minuteminuteorrange)
	* [`second()`](#secondsecondorrange)
	* [`millisecond()`](#millisecondmsorrange)
	* [`date()`](#datedateformat-datevalue)
* Array of Numbers
	* [`min()`](#minnumberorrange)
	* [`max()`](#maxnumberorrange)
	* [`avg()`](#avgnumberorrange)
	* [`sum()`](#sumnumberorrange)
	* [`count()`](#countitem-numberorrange)
	* [`unique()`](#uniquenumberorrange)
* Objects
	* [`hasKey()`](#haskeykeyname)
	* [`hasKeys()`](#haskeyskeynamesarr-mode)
	* [`hasValue()`](#hasvaluevalue)
	* [`hasValues()`](#hasvaluesvaluesarr-mode)
	* [`hasProp()`](#haspropkeyname-value)
	* [`hasProps()`](#haspropspairarr-mode)
* [Types](#types)
	* `isType()`
	* `isInstanceOf()`
	* `isNull()`
	* `isUndefined()`
	* `isTruthy()`
	* `isFalsy()`
	* `isInteger()`
	* `isFloat()`


### General

#### `equal(value, strict?=true)`

Matches a value that equals another one.

```
.where({
	age: ObjQL.equal('20', false)
})
```

#### `is(value)`

Matches a value that is equal to another one; uses _Object.is()_.

```
where({
	result: ObjQL.is(NaN)
})
```

#### `in(valuesArray)`

Matches a value that equals one from an array.

```
where({
	group: ObjQL.in(['A', 'B', 'C', 'D'])
})
```

#### `range(min, max)`

Matches a value that is from the range _&lt;min;max&gt;_.

```
where({
	age: ObjQL.range(15, 25)
})
```

#### `regExp(re)`

Matches a value that matches a regular expression.

```
where({
	name: ObjQL.regExp(/^.A/i)
})
```

#### `like(pattern)`

Matches a value that matches to a pattern:

* _%_ - zero or more characters
* _\__ - exactly 1 character

```
where({
	name: ObjQL.like('%A_a_')
})
```

#### `ref(anotherField)`

Matches a value by a value of other field.

```
where({
	name: ObjQL.ref('fatherName')
})
```

#### `size(numberOrRange)`

Matches a value by its length or size, depending on it is a string, an array, a set or a map.

```
where({
	term: ObjQL.size([20, null])
})
```

#### `likeArray(valuesArr)`

Matches a value that is an array containing all the values from the array passed to the matcher (meanwhile it can contain other values).

```
match({
	flags: ObjQL.likeArray(['canWrite', 'canEdit'])
})
```

* `['canWrite', 'canEdit', 'canDelete']` will be matched

#### `likeExactArray(valuesArr, checkIndexes?=false)`

Matches a value that is an array containing all the values from the array passed to the matcher (meanwhile it can't contain other values).

```
where({
	badges: ObjQL.likeExactArray(['Freshman'])
})
```

* `['Freshman']` will be matched
* `['Freshman', 'Mentor']` will not be matched

#### `match(fn)`

Matches a value by a custom condition.

```
where({
	name: ObjQL.match((val, rec) => val === rec.surname)
})
```

A callback passed to the `match()` matcher can accept up to 4 parameters:
* value of a field in a current record
* entire current record
* index of the current record in the entire collection
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

#### `firstChar(char)`

Matches a value by the first character.

```
where({
	city: ObjQL.firstChar('A')
})
```

#### `lastChar(char)`

Matches a value by the last character.

```
where({
	city: ObjQL.lastChar('Z')
})
```

#### `nthChar(char, position)`

Matches a value by the n-th character.

```
where({
	city: ObjQL.nthChar('D', 3)
})
```

#### `startsWith(substr, caseSensitive?=true)`

Matches a value by the beginning.

```
where({
	city: ObjQL.startsWith('Los')
})
```

#### `endsWith(substr, caseSensitive?=true)`

Matches a value by the end.

```
where({
	city: ObjQL.endsWith('os')
})
```

#### `contains(substr, caseSensitive?=true)`

Matches a value by a substring.

```
where({
	city: ObjQL.contains('yo')
})
```

### Date

The functions check date that can be represented by:

* a particular value (e.g., `month(4)` to match _April_)
* an instance of the `Date()`
* a timestamp (a number of milliseconds that have passed from 01.01.1970 00:00:00)
* the `ObjQL.CURRENT` constant
* a string in one of the following formats:
	* `YYYY-MM-DD`
	* `DD.MM.YYYY`
	* `MM/DD/YYYY`

> When it comes to the last one, a time part can be added. The following time formats are allowed: `HH:mm`, `HH:mm:ss` and `HH:mm:ss.uuu` (`uuu` means milliseconds here).

#### `year(fullYearOrRange)`

Matches a value by a full year (e.g., _1998_ rather than _98_).

```
where({
	registered: ObjQL.year(2010)
})
```

#### `month(monthIndexOrRange)`

Matches a value by a month in date.

```
where({
	birth_date: ObjQL.month(12)
})
```

#### `day(dayIndexOrRange)`

Matches a value by a day in date.

```
where({
	birth_date: ObjQL.day(20)
})
```

#### `weekDay(weekDayIndexOrRange)`

Matches a value by a week day; 1 is for Monday, 7 is for Sunday.

```
where({
	weekend_visits: ObjQL.weekDay(6)
})
```

#### `hour(hourOrRange)`

Matches a value by an hour.

```
where({
	orders: ObjQL.hour(15)
})
```

#### `minute(minuteOrRange)`

Matches a value by a minute.

```
where({
	orders: ObjQL.minute(30)
})
```

#### `second(secondOrRange)`

Matches a value by a second.

```
where({
	lap: ObjQL.second(10)
})
```

#### `millisecond(msOrRange)`

Matches a value by a millisecond.

```
where({
	click: ObjQL.millisecond(12)
})
```

#### `date(dateFormat, dateValue)`

Matches a value by a date.

```
where({
	birth_date: ObjQL.date('DD.MM', '14.02')
})
```

The `dateFormat` parameter in the `date()` method can consist of the following parts:

* `YYYY` - full year
* `MM` - month
* `DD` - day
* `HH` - hour
* `mm` - minute
* `ss` - second
* `uuu` - millisecond

##### Examples of matching date

* match entries where the `start_date` field is date whose month is April

```
where({
	start_date: ObjQL.month(4)
})
```

* match entries where the `start_date` field is date whose day is 14th and month is February

```
where({
	start_date: ObjQL.date('DD.MM', '14.02')
})
```

Note that the second parameter may be the standard date. In such a case, it does not have to match a format given as the first parameter. Elements from the first parameter will be used to compare dates:

```
where({
	// pass entire date
	// but only compare day and month
	start_date: ObjQL.date('DD.MM', '2020-02-14 15:45:30')
})
```

* match entries where the `event_date` field is date whose week day is Friday, Saturday or Sunday

```
where({
	event_date: ObjQL.weekDay([5, 7])
})
```

### Array of Numbers

#### `min(numberOrRange)`

Matches a value by minimum value(s) in an array.

```
where({
	results: ObjQL.min([250, null])
})
```

#### `max(numberOrRange)`

Matches a value by maximum value(s) in an array.

```
where({
	heights: ObjQL.max(100)
})
```

#### `avg(numberOrRange)`

Matches a value by average value(s), i.e., the mean, of an array.

```
where({
	test: ObjQL.avg([4, 5])
})
```

#### `sum(numberOrRange)`

Matches a value by sum of an array items.

```
where({
	marks: ObjQL.sum(24)
})
```

#### `count(item, numberOrRange)`

Matches a value by a number of item occurencies.

```
where({
	comment: ObjQL.count('fuc', [null, 3])
})
```

#### `unique(numberOrRange)`

Matches a value by a number of unique items.

```
where({
	awards: ObjQL.unique([10, 50])
})
```

##### Example ranges

* `count('a', [1, 4])` - a number of occurencies of `a` >= 1 and <= 4
* `count('a', [2, null])` - a number of occurencies of `a` >= 2
* `count('a', [null, 5])` - a number of occurencies of `a` <= 5

##### How do `min()`, `max()`, etc. work?

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

#### `hasKey(keyName)`

Matches an object that has a given key.

```
where({
	config: ObjQL.hasKey('language')
})
```

#### `hasKeys(keyNamesArr, mode)`

Matches an object that has the given keys:

*  **all** if `mode` equals `ALL` (default value)
* **some** if `mode` equals `SOME`

```
where({
	theme: ObjQL.hasKeys(['color', 'background'], 'SOME')
})
```

#### `hasValue(value)`

Matches an object that has a given value.

```
where({
	theme: ObjQL.hasValue('pink')
})
```

#### `hasValues(valuesArr, mode)`

Match an object that has the given values:

*  **all** if `mode` equals `ALL` (default value)
* **some** if `mode` equals `SOME`

```
where({
	config: ObjQL.hasValues(['PL', 'FR'], 'SOME')
})
```

#### `hasProp(keyName, value)`

Matches an object that has a given key equal to given value.

```
where({
	theme: ObjQL.hasProp('color', 'red')
})
```

#### `hasProps(pairArr, mode)`

Matches an object that has the given keys equal to a respective value:

*  **all** if `mode` equals `ALL` (default value)
* **some** if `mode` equals `SOME`

```
where({
	config: ObjQL.hasProps([['language', 'PL'], ['location', 'Poland']])
})
```

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