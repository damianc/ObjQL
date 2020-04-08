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

| Function | Purpose | Example |
|----------|---------|---------|
| **firstChar(char)** | match value by the first character | `{city: ObjQL.firstChar('A')}` |
| **lastChar(char)** | match value by the last character | `{city: ObjQL.lastChar('Z')}` |
| **nthChar(char, position)** | match value by the n-th character | `{city: ObjQL.nthChar('D', 3)}` |
| **startsWith(substr, caseSensitive?=true)** | match value by the beginning | `{city: ObjQL.startsWith('Los')}` |
| **endsWith(substr, caseSensitive?=true)** | match value by the end | `{city: ObjQL.endsWith('os')}` |
| **contains(substr, caseSensitive?=true)** | match value by a substring | `{city: ObjQL.contains('yo')}` |

### Date

There are functions checking date that can be represented by:

* a particular value (e.g., `month(4)` to match _April_)
* an instance of the `Date()`
* a timestamp (a number of milliseconds that have passed from 01.01.1970 00:00:00)
* a string in one of the following formats:
	* `YYYY-MM-DD HH:mm:ss.uuu`
	* `DD.MM.YYYY HH:mm:ss.uuu`
	* `MM/DD/YYYY HH:mm:ss.uuu`
* the `ObjQL.CURRENT` constant

> When it comes to the latest three, the following parts are optional: entire time part (`HH:mm:ss.uuu`), seconds with milliseconds (`ss.uuu`) and milliseconds (`uuu`).

| Function | Purpose | Example |
|----------|---------|---------|
| **day(dayIndexOrRange)** | match value by a day in date | `{birth_date: ObjQL.day(20)}` |
| **month(monthIndexOrRange)** | match value by a month in date | `{birth_date: ObjQL.month(12)}` |
| **year(fullYearOrRange)** | match value by a full year (e.g., _1998_ rather than _98_) | `{registered: ObjQL.year(2010)}` |
| **hour(hourOrRange)** | match value by an hour | `{orders: ObjQL.hour(15)}` |
| **minute(minuteOrRange)** | match value by a minute | `{orders: ObjQL.minute(30)}` |
| **second(secondOrRange)** | match value by a second | `{lap: ObjQL.second(10)}` |
| **millisecond(msOrRange)** | match value by a millisecond | `{click: ObjQL.millisecond(12)}` |
| **date(dateFormat, dateValue**) | match value by a date | `{birth_date: ObjQL.date('DD.MM', '14.02')}` |
| **weekDay(weekDayIndexOrRange)** | match value by a week day (1=Monday, 7=Sunday) | `{weekend_visits: ObjQL.weekDay(6)}` |

> The `dateFormat` parameter in the `date()` method can consist of the following parts: `YYYY` - full year, `MM` - month, `DD` - day, `HH` - hour, `mm` - minute, `ss` - second, `uuu` - millisecond.

#### Examples of matching date

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