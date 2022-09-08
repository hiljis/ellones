export const capFirst = (string: string) => {
	return string[0].toUpperCase().concat(string.slice(1, string.length));
};
