import { UserDocumentType } from "./documentsEnums";

export const documentTypeToDisplayStringConverter = (documentType?: UserDocumentType) => {
	switch (documentType) {
		case UserDocumentType.PASSPORT_MAIN:
			return "Паспорт (главная)";

		case UserDocumentType.PASSPORT_REGISTRATION:
			return "Паспорт (регистрация)";

		case UserDocumentType.DRIVER_LICENSE:
			return "Водительское удостоверение";

		case UserDocumentType.TAXPAYER_IDENTIFICATION_NUMBER:
			return "ИНН";
		default:
			return "";
	}
};
