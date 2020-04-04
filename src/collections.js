import { doCheck } from './check/do-check';
import { getCheckType } from './check/get-check-type';

export const QUERIED_FIELDS = Symbol('ObjQL: Queried Fields');
export const COMPOUND_FIELDS = Symbol('ObjQL: Compound Fields');

export class QueryableCollection {
	constructor(collection) {
		this.collection = collection.slice();
	}

	select(fields, compoundFields = null, fnDeps = []) {
		this.collection[QUERIED_FIELDS] = fields;
		this.collection[COMPOUND_FIELDS] = [compoundFields, fnDeps];

		const fc = new FilterableCollection(
			this.collection
		);
		return fc;
	}
}

export class FilterableCollection {
	constructor(queryableCollection) {
		this.collection = queryableCollection;
	}

	where(queries) {
		let filteredCollection;

		if (!queries) {
			filteredCollection = this.collection;
		} else {
			const queriesEntries = Object.entries(queries);
			
			filteredCollection = this.collection.filter(item => {
				let doesMatch = true;

				for (let queriesEntry of queriesEntries) {
					let [key, value] = queriesEntry;
					let checkType = getCheckType(value);
					if (!doCheck(item[key], value, item, checkType)) {
						doesMatch = false;
						break;
					}
				}

				const [addCompound, callbackDeps] = this.collection[COMPOUND_FIELDS];

				if (doesMatch && addCompound) {
					let hasDeps = true;

					if (callbackDeps.length > 0) {
						for (let dep of callbackDeps) {
							if (!(dep in item)) {
								hasDeps = false;
								break;
							}
						}
					}

					if (hasDeps) {
						Object.assign(item, addCompound(item));
					}
				}

				return doesMatch;
			});
		}

		const sc = new SortableCollection(filteredCollection);
		sc[QUERIED_FIELDS] = this.collection[QUERIED_FIELDS].slice();
		sc[COMPOUND_FIELDS] = this.collection[COMPOUND_FIELDS];
		return sc;
	}
}

export class SortableCollection extends Array {
	constructor(filterableCollection) {
		super(...filterableCollection);
	}

	sort(field) {
		const isDescending = field[0] == '-';
		const fieldName = isDescending ? field.slice(1) : field;

		return super.sort((a, b) => {
			let fieldA = a[fieldName] || null;
			let fieldB = b[fieldName] || null;

			if (isDescending) {
				[fieldA, fieldB] = [fieldB, fieldA];
			}

			return (
				typeof fieldA == 'string' ?
				fieldA.localeCompare(fieldB) :
				fieldA - fieldB
			);
		});
	}

	limit(beginning, length) {
		var arr = [...this];
		return arr.slice(beginning-1, beginning - 1 + length);
	}
}