// Не менять последовательность. Перечисление используется для генерации пути до картинки в хранилище
export enum UserDocumentType {
	PASSPORT_MAIN,
	PASSPORT_REGISTRATION,
	DRIVER_LICENSE,
	TAXPAYER_IDENTIFICATION_NUMBER,
}

export enum UserDocumentStatus {
	NONE,
	VERIFICATION,
	ACCEPTED,
	REJECTED,
}
