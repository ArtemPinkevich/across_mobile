import {
	APPROVING_ORDER_STATUS_COLOR,
	TO_LOADING_ORDER_STATUS_COLOR,
	TRANSPORTING_ORDER_STATUS_COLOR,
	UNLOADING_ORDER_STATUS_COLOR,
} from "../../constants/Colors";
import { TransportationStatus } from "./TransportationStatus";

export const TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP = new Map<Object, string>([
	[TransportationStatus.notPublished, "Не опублекованно"],
	[TransportationStatus.carrierFinding, "В заявке"],
	[TransportationStatus.managerApproving, "на рассмотрении"],
	[TransportationStatus.shipperApproving, "на согласовании"],
	[TransportationStatus.waitingForLoading, "В пути на загрузку"],
	[TransportationStatus.loading, "Загрузка"],
	[TransportationStatus.transporting, "В дороге"],
	[TransportationStatus.unloading, "Выгрузка"],
	[TransportationStatus.delivered, "Выгружено"],
	[TransportationStatus.done, "Доставлено"],
]);

export const TRANSPORTATION_STATUS_DISPLAY_NAME_ARRAY = Array.from(TRANSPORTATION_STATUS_TO_DISPLAY_NAME_MAP, ([value, displayName]) => ({
	value,
	displayName,
}));

export const TRANSPORTATION_STATUS_TO_BGCOLOR_MAP = new Map<Object, string>([
	[TransportationStatus.notPublished, APPROVING_ORDER_STATUS_COLOR],
	[TransportationStatus.carrierFinding, APPROVING_ORDER_STATUS_COLOR],
	[TransportationStatus.managerApproving, APPROVING_ORDER_STATUS_COLOR],
	[TransportationStatus.shipperApproving, APPROVING_ORDER_STATUS_COLOR],
	[TransportationStatus.waitingForLoading, TO_LOADING_ORDER_STATUS_COLOR],
	[TransportationStatus.loading, TO_LOADING_ORDER_STATUS_COLOR],
	[TransportationStatus.transporting, TRANSPORTING_ORDER_STATUS_COLOR],
	[TransportationStatus.unloading, UNLOADING_ORDER_STATUS_COLOR],
	[TransportationStatus.delivered, UNLOADING_ORDER_STATUS_COLOR],
	[TransportationStatus.done, UNLOADING_ORDER_STATUS_COLOR],
]);

export const TRANSPORTATION_STATUS_TO_TEXTCOLOR_MAP = new Map<Object, string>([
	[TransportationStatus.notPublished, "#000"],
	[TransportationStatus.carrierFinding, "#000"],
	[TransportationStatus.managerApproving, "#000"],
	[TransportationStatus.shipperApproving, "#000"],
	[TransportationStatus.waitingForLoading, "#fff"],
	[TransportationStatus.loading, "#fff"],
	[TransportationStatus.transporting, "#fff"],
	[TransportationStatus.unloading, "#000"],
	[TransportationStatus.delivered, "#000"],
	[TransportationStatus.done, "#000"],
]);
