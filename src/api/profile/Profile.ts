import { ApiCommonResult } from "../common/commonApi";

export interface IProfile {
    name?: string;
    surname?: string;
    patronymic?: string;
    birthDate?: string; // Строка ISO
    phoneNumber: string;
}

export interface IProfileResult {
    result: ApiCommonResult;
    reasons: string[];
}
