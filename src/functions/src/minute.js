const minute = ObjQL => {

	return (minute) => {
		return ObjQL.check((val) => {
			if (!val) return;

			const _minute = val.getMinutes();
			return minute === _minute;
		});
	};
	
};

export default minute;