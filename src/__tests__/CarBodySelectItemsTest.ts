import { CarBodyType } from '../api/truck/CarBodyType';
import { CARBODY_DISPLAY_NAME_MAP } from '../components/common/selectList/CarBodyToDisplayNameMap';

it(`all CarBodyType exist in CARBODY_SELECT_ITEMS`, () => {
  const carBodiesArrayOfEnum = Object.values(CarBodyType).filter(o => !isNaN(Number(o)));
  const indexOfNotExistedCarBodyInTheMap = carBodiesArrayOfEnum.findIndex(o => !CARBODY_DISPLAY_NAME_MAP.has(o));
  expect(indexOfNotExistedCarBodyInTheMap).toBe(-1);
});
