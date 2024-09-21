// Не менять последовательность. Перечисление используется для генерации пути до картинки в хранилище
export enum UserContentType {
	AVATAR,
	PASSPORT_MAIN,
	PASSPORT_REGISTRATION,
	DRIVER_LICENSE,
	TAXPAYER_IDENTIFICATION_NUMBER,
	TRUCK_PHOTO_FRONT,
	TRUCK_PHOTO_BACK,
	TRUCK_PHOTO_LEFT,
	TRUCK_PHOTO_RIGHT,
}

export enum UserDocumentStatus {
	NONE,
	VERIFICATION,
	ACCEPTED,
	REJECTED,
}
