const date = ObjQL => {

	const getDatePart = (part) => {}

	return (dateFormat, dateValue) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);
			const passed = {};

			const yearIdx = dateFormat.indexOf('YYYY');
			if (yearIdx !== -1) passed.year = dateValue.slice(yearIdx, yearIdx + 4);

			const monthIdx = dateFormat.indexOf('MM');
			if (monthIdx !== -1) passed.month = dateValue.slice(monthIdx, monthIdx + 2);

			const dayIdx = dateFormat.indexOf('DD');
			if (dayIdx !== -1) passed.day = dateValue.slice(dayIdx, dayIdx + 2);

			const hourIdx = dateFormat.indexOf('HH');
			if (hourIdx !== -1) passed.hour = dateValue.slice(hourIdx, hourIdx + 2);

			const minuteIdx = dateFormat.indexOf('mm');
			if (minuteIdx !== -1) passed.minute = dateValue.slice(minuteIdx, minuteIdx + 2);

			const secondIdx = dateFormat.indexOf('ss');
			if (secondIdx !== -1) passed.second = dateValue.slice(secondIdx, secondIdx + 2);

			const millisecondIdx = dateFormat.indexOf('uuu');
			if (millisecondIdx !== -1) passed.millisecond = dateValue.slice(millisecondIdx, millisecondIdx + 3)

			/**/

			let matches = true;

			if (passed.year && passed.year != val.getFullYear()) matches = false;
			if (passed.month && passed.month != val.getMonth() + 1) matches = false;
			if (passed.day && passed.day != val.getDate()) matches = false;
			if (passed.hour && passed.hour != val.getHours()) matches = false;
			if (passed.minute && passed.minute != val.getMinutes()) matches = false;
			if (passed.second && passed.second != val.getSeconds()) matches = false;
			if (passed.millisecond && passed.millisecond != val.getMilliseconds()) matches = false;

			return matches;
		});
	};
	
};

export default date;