const minute = ObjQL => {

	return (minute) => {
		return ObjQL.match((val) => {
			if (!val) return;

			const _minute = val.getMinutes();
			return minute === _minute;
		});
	};
	
};

export default minute;