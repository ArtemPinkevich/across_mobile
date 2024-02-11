import { LoadingType } from "../api/truck/LoadingType";
import { LOADING_TYPE_DISPLAY_NAME_MAP } from "../components/common/selectList/LoadingTypeToDisplayNameMap";

it(`all LoadingType exist in LOADING_TYPE_DISPLAY_NAME_MAP`, () => {
    const loadingTypesArrayOfEnum = Object.values(LoadingType).filter((o) => !isNaN(Number(o)));
    const indexOfNotExistedLoadingTypeInTheMap = loadingTypesArrayOfEnum.findIndex((o) => !LOADING_TYPE_DISPLAY_NAME_MAP.has(o));
    expect(indexOfNotExistedLoadingTypeInTheMap).toBe(-1);
});
