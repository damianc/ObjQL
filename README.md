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

const queryable = ObjQL(collection);
const queried = queryable.where({
	age: 18
});

// => [{name: 'Adam', age: 18}]
```

## Requesting a Value

### Value Must Equal Another Value

```
...where({
	name: 'John'
})
```

### Value Must Match to Pattern

```
...where({
	name: /^J/
})
```

### Value Must Equal One of Values

```
...where({
	group: new Set(['A', 'B', 'C'])
})
```

### Numeric Value Must be Contained in a Range

```
...where({
	age: [20, 32]
})
```

## Functions

### General

| Function | Purpose | Example |
|----------|---------|---------|
| **equal(value, strict?)** | match value that equals another one | `{age: ObjQL.equal('20', false)}` |
| **is(value)** | match value that is equal to another one (uses _Object.is()_) | `{result: ObjQL.is(NaN)}` |
| **in(valuesArray)** | match value that equals one from an array | `{group: ObjQL.in(['A', 'B', 'C', 'D'])}` |
| **range(min, max)** | match value that is from the range _&lt;min;max&gt;_ | `{age: ObjQL.range(15, 25)}` |
| **ref(anotherField)** | match value by a value of other field | `{name: ObjQL.ref('fatherName')}` |
| **check(fn)** | match value by a custom condition | `{name: ObjQL.check((val, rec) => val === rec.surname)}` |

### Strings

| Function | Purpose | Example |
|----------|---------|---------|
| **firstChar(char)** | match value by the first character | `{city: ObjQL.firstChar('A')}` |
| **lastChar(char)** | match value by the last character | `{city: ObjQL.lastChar('Z')}` |
| **nthChar(char, position)** | match value by the n-th character | `{city: ObjQL.nthChar('D', 3)}` |
| **startsWith(substr, caseSensitive?)** | match value by the beginning | `{city: ObjQL.startsWith('Los')}` |
| **endsWith(substr, caseSensitive?)** | match value by the end | `{city: ObjQL.endsWith('os')}` |
| **contains(substr, caseSensitive?)** | match value by a substring | `{city: ObjQL.contains('yo')}` |

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
| **min(n, highestN?)** | match value by minimum value(s) in an array | `{height: ObjQL.min(180, 190)}` |
| **max(n, highestN?)** | match value by maximum value(s) in an array | `{weight: ObjQL.max(100)}` |
| **avg(n, highestN?)** | match value by average value(s) of an array | `{test: ObjQL.avg(4, 5)}` |
| **sum(n, highestN?)** | match value by sum of an array items | `{width: ObjQL.sum(24)}` |
| **count(item, n, highestN?)** | match value by a number of item occurencies | `{marks: ObjQL.count(5, 2)}` |
| **unique(n, highestN?)** | match value by a number of unique items | `{awards: ObjQL.unique(10, 50)}` |

#### How do `min()`/`max()` work?

```
const collection = ObjQL([
	{name: 'John', marks: [3, 4, 6]},
	{name: 'Mark', marks: [2, 3, 5]}
]);

const result = collection.where({
	marks: ObjQL.min(2)
});
// only Mark has been matched
// John has not as his minimum value is 3

const result2 = collection.where({
	marks: ObjQL.min(2, 4)
});
// both Mark and John have been matched
// given minimum value is from the range 2-4
```