import { CarBodyType } from '../api/truck/CarBodyType';
import {CARBODY_SELECT_ITEMS} from '../components/common/selectList/CarBodySelectItemArray';

it(`all CarBodyType exist in CARBODY_SELECT_ITEMS`, () => {
  const carBodiesArrayOfEnum = Object.values(CarBodyType).filter(o => !isNaN(Number(o)));
  const selectItems = CARBODY_SELECT_ITEMS.map(o => o.value);
  const resultArray = carBodiesArrayOfEnum.filter((o) => selectItems.indexOf(o) == -1);

  expect(resultArray.length).toBe(0);
});
