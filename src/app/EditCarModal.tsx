import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { ScrollView, Center, Button, CheckIcon, FormControl, Select, Pressable } from 'native-base';
import { addCar } from '../store/slices/garageSlice';
import { TrailerType } from '../api/truck/TrailerType';
import { ITruck } from '../api/truck/Truck';
import { LeftAlignedSection } from '../components/screenItems/LeftAlignedSection';
import { RootState } from '../store/configureStore';
import { CARBODY_DISPLAYNAME_MAP } from '../components/common/selectList/CarBodySelectItemArray';

export default function EditCarModal() {
    
  const dispatch = useDispatch()
  
  const [trailerType, setTrailerType] = useState<TrailerType | undefined>()
  
  const editingTruсk = useSelector((state: RootState) => state.garage.editingTruсk)
  const carBodyDisplayName = editingTruсk?.carBody ? CARBODY_DISPLAYNAME_MAP.get(editingTruсk.carBody) : 'Не выбрано';
  
  const saveHandler = () => {
    if (!trailerType){
      alert('Необходимо указать тип прицепа')
      return
    }

    if (!editingTruсk.carBody){
      alert('Необходимо указать тип кузова')
      return
    }

    if (!editingTruсk.loadingType){
      alert('Необходимо указать тип загрузки')
      return
    }

    const truck: ITruck = {
      createdId: new Date().toJSON(),
      trailerType: TrailerType.Truck,
      carBody: editingTruсk.carBody,
      regNumber: '',
      loadingType: editingTruсk.loadingType,
      hasLTL: false,
      hasLiftgate: false,
      hasStanchionTrailer: false,
      carryingCapacity: 0,
      bodyVolume: 0,
      innerBodyLength: 0,
      innerBodyWidth: 0,
      innerBodyHeight: 0,
      adr1: false,
      adr2: false,
      adr3: false,
      adr4: false,
      adr5: false,
      adr6: false,
      adr7: false,
      adr8: false,
      adr9: false,
      tir: false,
      ekmt: false
    }
    
    dispatch(addCar(truck))
    router.back();
  }
  
  const carWashSectionOnPress = () => {
    router.push('/CarBodySelectListModal')
  }

  const loadingTypeSectionOnPress = () => {
    router.push('/LoadingTypeSelectListModal')
  }
  
  return (
    <ScrollView mx={"2"}>

      {/* По хорошему заменить бы на RadioButtons */}
      <FormControl isRequired mb={1}>
        <FormControl.Label>Тип прицепа</FormControl.Label>
        <Select minWidth="200" accessibilityLabel="TrailerType" onValueChange={arg => setTrailerType(+arg)} _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />
        }}>
          <Select.Item label="Полуприцеп" value={TrailerType.Truck.toString()} />
          <Select.Item label="Грузовик" value={TrailerType.Trailer.toString()} />
          <Select.Item label="Сцепка" value={TrailerType.Semitrailer.toString()} />
        </Select>
      </FormControl>
      
      <Pressable onPress={carWashSectionOnPress} my={1}>
        <LeftAlignedSection title={"Тип кузова"} value={carBodyDisplayName ?? 'Не выбрано'}/>
      </Pressable>
        
      <Pressable onPress={loadingTypeSectionOnPress} my={1}>
          <LeftAlignedSection title={"Тип загрузки"} value={editingTruсk?.loadingType?.toString() ?? 'Не выбрано'} />
      </Pressable>

      <Center mt={8}>
        <Button minW={200} size={"lg"} variant="outline" onPress={saveHandler}>
          Сохранить
        </Button>
      </Center>

    </ScrollView>
  );
}
