// import { doCheck, getCheckType } from './check';
import { doCheck } from './check/do-check';
import { getCheckType } from './check/get-check-type';

export default class QueryableArray extends Array {
	where(queries) {
		if (!queries) {
			return this.slice();
		}

		const queriesEntries = Object.entries(queries);
		
		return this.filter(item => {
			let doesMatch = true;

			for (let queriesEntry of queriesEntries) {
				let [key, value] = queriesEntry;
				let checkType = getCheckType(value);
				if (!doCheck(item[key], value, checkType)) {
					doesMatch = false;
					break;
				}
			}

			return doesMatch;
		});
	}
}