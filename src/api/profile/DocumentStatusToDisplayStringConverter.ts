import { UserDocumentStatus } from "./documentsEnums";

export const DocumentStatusToDisplayStringConverter = (documentStatus?: UserDocumentStatus) => {
	switch (documentStatus) {
		case UserDocumentStatus.NONE:
			return "Не загружено";

		case UserDocumentStatus.VERIFICATION:
			return "На проверке";

		case UserDocumentStatus.ACCEPTED:
			return "Подтверждено";

		case UserDocumentStatus.REJECTED:
			return "Отклонено";

		default:
			return "";
	}
};
