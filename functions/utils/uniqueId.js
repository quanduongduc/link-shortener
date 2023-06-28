function generateUniqueId() {
	try {
		let uniqueString = '';

		const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		for (let i = 0; i < 7; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			uniqueString += characters.charAt(randomIndex);
		}

		return uniqueString;
	} catch (error) {
		throw error
	}
}

export { generateUniqueId };
