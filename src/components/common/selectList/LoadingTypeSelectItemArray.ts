import { LoadingType } from "../../../api/truck/LoadingType";
import { ISelectItem } from "./SelectItem";

export const LOADING_TYPE_SELECT_ITEM_ARRAY: ISelectItem[] = [
    { 
        displayName: "Верхняя", 
        value: LoadingType.top 
    },
    { 
        displayName: "Боковая", 
        value: LoadingType.side 
    },
    { 
        displayName: "Задняя", 
        value: LoadingType.rear 
    },
    { 
        displayName: "С полной растентовкой", 
        value: LoadingType.full 
    },
    { 
        displayName: "Со снятием поперечных перекладин", 
        value: LoadingType.withSlidingRoof 
    },
    { 
        displayName: "Со снятием стоек", 
        value: LoadingType.withRemovablePillars 
    },
    { 
        displayName: "Без ворот", 
        value: LoadingType.withoutGates 
    },
    { 
        displayName: "Гидроборт", 
        value: LoadingType.hydroboard 
    },
    { 
        displayName: "Аппарели", 
        value: LoadingType.apparels 
    },
    { 
        displayName: "С обрешеткой", 
        value: LoadingType.withCrate 
    },
    { 
        displayName: "С бортами", 
        value: LoadingType.withBoards 
    },
    { 
        displayName: "Боковая с 2-х сторон", 
        value: LoadingType.sideBySide 
    },
    { 
        displayName: "Налив", 
        value: LoadingType.pour 
    },
    { 
        displayName: "Электрический", 
        value: LoadingType.electric 
    },
    { 
        displayName: "Гидравлический", 
        value: LoadingType.hydraulic 
    },
    { 
        displayName: "Не указан", 
        value: LoadingType.unspecified 
    },
    { 
        displayName: "Пневматический", 
        value: LoadingType.pneumatic 
    },
    { 
        displayName: "Дизельный компрессор", 
        value: LoadingType.dieselCompressor 
    },
]
