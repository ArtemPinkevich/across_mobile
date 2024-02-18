import { SERVER_ADDRESS } from "../../constants/GlobalConstants";
import { ITruck } from "./Truck";

enum TruckResult {
    Ok,
    Error,
}

export interface ITruckResultDto {
    result: TruckResult;
    reasons: string[];
}

export async function addOrUpdateTruckRequestAsync(truck: ITruck) {
    try {
        // TODO избавиться с переходом на Axios. Без перехода все ровно сделать по красоте надо.
        var token = localStorage.getItem("session");

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(truck),
        };

        console.log("------- addOrUpdateTruckRequestAsync ---------");
        console.log(truck);
        const response = await fetch(`${SERVER_ADDRESS}/api/Truck/add_or_update_truck`, options);
        if (!response.ok) {
            console.error(`Ошибка add_or_update_truck: ${response.status}`);
            return undefined;
        }

        const responseDto: ITruckResultDto = await response.json();
        return responseDto;
    } catch (error) {
        console.log("---------- addOrUpdateTruckRequestAsync Fetch error: ", error);
    }
}
