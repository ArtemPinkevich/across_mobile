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
