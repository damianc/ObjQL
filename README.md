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

| Function | Purpose | Example |
|----------|---------|---------|
| **ref(anotherField)** | match value by a value of other field | `{name: ObjQL.ref('fatherName')}` |
| **firstChar(char)** | match value by the first character | `{city: ObjQL.firstChar('A')}` |
| **lastChar(char)** | match value by the last character | `{city: ObjQL.lastChar('Z')}` |
| **nthChar(char, position)** | match value by the n-th character | `{city: ObjQL.nthChar('D', 3)}` |
| **startsWith(substr)** | match value by the beginning | `{city: ObjQL.startsWith('Los')}` |
| **endsWith(substr)** | match value by the end | `{city: ObjQL.endsWith('os')}` |
| **contains(substr)** | match value by a substring | `{city: ObjQL.contains('yo')}` |
| **check(fn)** | match value by a custom condition | `{name: ObjQL.check((val, rec) => value === rec.surname)}` |
| **day(dayIndex)** | match value by a day in date | `{birth_date: ObjQL.day(20)}` |
| **month(monthIndex)** | match value by a month in date | `{birth_date: ObjQL.month(12)}` |
| **year(fullYear)** | match value by a full year (e.g., _1998_ rather than _98_) | `{registered: ObjQL.year(2010)}` |
| **date(dateString**) | match value by a date (_DD.MM.YYYY_ or _DD.MM_) | `{birth_date: ObjQL.date('14.02')}` |
| **min(n, highestN)** | match value by minimum value(s) in an array | `{height: ObjQL.min(180, 190)}` |
| **max(n, highestN)** | match value by maximum value(s) in an array | `{weight: ObjQL.max(100)}` |
| **avg(n, highestN)** | match value by average value(s) of an array | `{test: ObjQL.avg(4, 5)}` |
| **sum(n, highestN)** | match value by sum of an array items | `{width: ObjQL.sum(24)}` |