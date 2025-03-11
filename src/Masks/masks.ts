export const normalizePhoneNumber = (value: string): string => {
	const cleaned = value.replace(/\D/g, "");

	if (cleaned.length > 11) {
		return value.slice(0, -1);
	}

	if (cleaned.length <= 10) {
		return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
	}
	return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
