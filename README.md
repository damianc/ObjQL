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

| Purpose | Example key-value pair |
|---------|------------------------|
| match value by an exact value | `{name: 'John'}` |
| match value by one of values | `{group: new Set(['A', 'B', 'C'])}` |
| match value by RegExp | `{name: /^J/}` |