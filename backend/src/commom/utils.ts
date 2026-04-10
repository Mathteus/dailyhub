export function anyType(objToValidade: any, listOfTypeToValidade: any[]) {
	for (const typeToValidade of listOfTypeToValidade) {
		if (objToValidade instanceof typeToValidade) {
			return true;
		}
	}
	return false;
}
