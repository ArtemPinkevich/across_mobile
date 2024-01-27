import React from 'react'
import { useDispatch } from 'react-redux'
import { Pressable } from 'react-native'
import { HStack, Center, VStack, Menu, Text } from 'native-base'
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeCar } from '../../store/slices/garageSlice'
import { ITruck } from '../../api/truck/Truck'

type CarProps = {
  truck: ITruck;
};

export const CarView = (props: CarProps) => {
  const { truck } = props;
  const dispatch = useDispatch()

  const removeHandler = () => {
    dispatch(removeCar(truck.createdId))
  };
  
  return (
    <HStack py={4} pl={4}>
      <Center>
        <Fontisto name="automobile" size={17}/>
      </Center>
      <VStack pl={5} w="80%">
        <Text bold fontSize="xl">{truck.carBody} {truck.trailerType} {truck.loadingType}</Text>
        <Text>{truck.regNumber}</Text>
      </VStack>
      {/* <Spacer/> */}
      <Center>
        {/* defaultIsOpen={false} чтобы не фризился экран (по мотивам https://github.com/GeekyAnts/NativeBase/issues/4730) */}
        <Menu shadow={2} w="150" defaultIsOpen={false} trigger={triggerProps => (
                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <MaterialCommunityIcons name="dots-vertical" size={17} />
                </Pressable>
          )}>
          <Menu.Item onPress={removeHandler}>Удалить</Menu.Item>
        </Menu>
      </Center>
    </HStack>
  )
}
