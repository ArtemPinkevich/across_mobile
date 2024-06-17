import { ApiCommonResult } from "../common/commonApi";
import { UserDocumentStatus, UserDocumentType } from "./documentsEnums";

export interface IProfile {
	name?: string;
	surname?: string;
	patronymic?: string;
	birthDate?: string; // Строка ISO
	phoneNumber: string;
	documents: IUserDocument[];
}

export interface IProfileResult {
	result: ApiCommonResult;
	reasons: string[];
}

export interface IUserDocument {
	documentType: UserDocumentType;
	status: UserDocumentStatus;
	comment?: string;
}
