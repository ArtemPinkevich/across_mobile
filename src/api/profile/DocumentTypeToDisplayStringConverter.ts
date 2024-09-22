import { UserContentType } from "./documentsEnums";

export const userContentTypeToDisplayStringConverter = (userContentType?: UserContentType) => {
	switch (userContentType) {
		case UserContentType.PASSPORT_MAIN:
			return "Удостоверение (лицевая сторона)";

		case UserContentType.PASSPORT_BACK_SIDE:
			return "Удостоверение (оборотная сторона)";

		case UserContentType.DRIVER_LICENSE:
			return "Водительское удостоверение";

		case UserContentType.ADR_CERTIFICATE:
			return "ADR сертификат";

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
