const generateUniqueId = () => {
	const timestamp = Date.now().toString(16);
	const randomValue = Math.random().toString(16);
	const uniqueId = timestamp + randomValue;
	return uniqueId;
};

export { generateUniqueId };
