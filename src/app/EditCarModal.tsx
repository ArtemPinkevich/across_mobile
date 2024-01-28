import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { ScrollView, Center, Button, CheckIcon, FormControl, Select, Pressable } from 'native-base';
import { addCar } from '../store/slices/garageSlice';
import { CarBodyType } from '../api/truck/CarBodyType';
import { TrailerType } from '../api/truck/TrailerType';
import { LoadingType } from '../api/truck/LoadingType';
import LoadTypeSelect from '../components/garage/LoadTypeSelect';
import { ITruck } from '../api/truck/Truck';
import { LeftAlignedSection } from '../components/screenItems/LeftAlignedSection';

export default function EditCarModal() {
    
  const dispatch = useDispatch()
  
  const [trailerType, setTrailerType] = useState<TrailerType>()
  const [carBodyType, setCarBodyType] = useState<CarBodyType>()
  const [loadingType, setLoadingType] = useState<LoadingType>()
  
  const saveHandler = () => {
    if (!trailerType){
      alert('Необходимо указать тип прицепа')
      return
    }

    if (!carBodyType){
      alert('Необходимо указать тип кузова')
      return
    }

    if (!loadingType){
      alert('Необходимо указать тип загрузки')
      return
    }

    const truck: ITruck = {
      createdId: new Date().toJSON(),
      trailerType: TrailerType.Truck,
      carBody: carBodyType,
      regNumber: '',
      loadingType: loadingType,
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
    router.push('/SelectCarBodyModal')
  }

  return (
    <ScrollView mx={"2"}>

      {/* По хорошему заменить бы на RadioButtons */}
      <FormControl isRequired mb={"2"}>
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

      
      <Pressable onPress={carWashSectionOnPress}>
          <LeftAlignedSection title={"Тип кузова"} value={carBodyType?.toString() ?? 'Не выбрано'}/>
      </Pressable>
        
      <FormControl isRequired my={"4"}>
        <FormControl.Label>Тип загрузки</FormControl.Label>
        <LoadTypeSelect value={loadingType?.toString()} onChange={arg => setLoadingType(+arg)}/>
      </FormControl>

      <Center mt={8}>
        <Button minW={200} size={"lg"} variant="outline" onPress={saveHandler}>
          Сохранить
        </Button>
      </Center>

    </ScrollView>
  );
}
