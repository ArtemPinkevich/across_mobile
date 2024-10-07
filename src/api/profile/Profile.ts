import { ApiCommonResult } from "../common/commonApi";
import { UserDocumentStatus, UserContentType } from "./documentsEnums";

export const DRIVER_ROLE = "Driver";
export const SHIPPER_ROLE = "Shipper";

export interface IProfile {
	name?: string;
	surname?: string;
	patronymic?: string;
	role?: string; // Может принимать только одно из двух значений: Shipper или Driver (см. константы DRIVER_ROLE и SHIPPER_ROLE)
	birthDate?: string; // Строка ISO
	phoneNumber: string;
	reservePhoneNumber: string;
	documentDtos: IUserDocument[];
}

export interface IProfileResult {
	result: ApiCommonResult;
	reasons: string[];
}

export interface IUserDocument {
	documentType: UserContentType;
	documentStatus: UserDocumentStatus;
	comment?: string;
}

export const FAKE_PROFILE: IProfile = {
	name: "Пинкевич",
	surname: "Артём",
	patronymic: "Владиславович",
	role: DRIVER_ROLE,
	birthDate: "1992-03-21",
	phoneNumber: "79539105697",
	reservePhoneNumber: "79539105697",
	documentDtos: [
		{
			documentType: UserContentType.DRIVER_LICENSE,
			documentStatus: UserDocumentStatus.ACCEPTED,
			comment: "",
		},
		{
			documentType: UserContentType.PASSPORT_MAIN,
			documentStatus: UserDocumentStatus.VERIFICATION,
			comment: "",
		},
		{
			documentType: UserContentType.PASSPORT_BACK_SIDE,
			documentStatus: UserDocumentStatus.NONE,
			comment: "",
		},
		{
			documentType: UserContentType.ADR_CERTIFICATE,
			documentStatus: UserDocumentStatus.REJECTED,
			comment: "Ну чесно, фото не очень :)",
		},
	],
};
