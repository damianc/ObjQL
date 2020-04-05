const date = ObjQL => {

	const getDatePart = (part) => {}

	return (dateFormat, dateValue) => {
		return ObjQL.match((_val) => {
			if (!_val) return;

			const val = ObjQL.x.parseDate(_val);

			if (ObjQL.x.isDateInput(dateValue)) {
				let _date = ObjQL.x.parseDate(dateValue);

				if (dateFormat.includes('YYYY') && (_date.getFullYear() != val.getFullYear())) return false;
				if (dateFormat.includes('MM') && (_date.getMonth() != val.getMonth())) return false;
				if (dateFormat.includes('DD') && (_date.getDate() != val.getDate())) return false;
				if (dateFormat.includes('HH') && (_date.getHours() != val.getHours())) return false;
				if (dateFormat.includes('mm') && (_date.getMinutes() != val.getMinutes())) return false;
				if (dateFormat.includes('ss') && (_date.getSeconds() != val.getSeconds())) return false;
				if (dateFormat.includes('ss') && (_date.getSeconds() != val.getSeconds())) return false;
				if (dateFormat.includes('uuu') && (_date.getMilliseconds() != val.getMilliseconds())) return false;

				return true;
			} 

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

			if (passed.year && passed.year != val.getFullYear()) return false;
			if (passed.month && passed.month != val.getMonth() + 1) return false;
			if (passed.day && passed.day != val.getDate()) return false;
			if (passed.hour && passed.hour != val.getHours()) return false;
			if (passed.minute && passed.minute != val.getMinutes()) return false;
			if (passed.second && passed.second != val.getSeconds()) return false;
			if (passed.millisecond && passed.millisecond != val.getMilliseconds()) return false;

			return true;
		});
	};
	
};

export default date;