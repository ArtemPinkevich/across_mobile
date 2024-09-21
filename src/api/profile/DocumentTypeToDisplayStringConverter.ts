import { UserContentType } from "./documentsEnums";

export const documentTypeToDisplayStringConverter = (documentType?: UserContentType) => {
	switch (documentType) {
		case UserContentType.PASSPORT_MAIN:
			return "Паспорт (главная)";

		case UserContentType.PASSPORT_REGISTRATION:
			return "Паспорт (регистрация)";

		case UserContentType.DRIVER_LICENSE:
			return "Водительское удостоверение";

		case UserContentType.TAXPAYER_IDENTIFICATION_NUMBER:
			return "ИНН";

		case UserContentType.TRUCK_PHOTO_FRONT:
			return "Спереди";

		case UserContentType.TRUCK_PHOTO_BACK:
			return "Сзади";

		case UserContentType.TRUCK_PHOTO_LEFT:
			return "Слева";

		case UserContentType.TRUCK_PHOTO_RIGHT:
			return "Справа";
		default:
			return "";
	}
};
