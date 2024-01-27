import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, FlatList, View, Fab, Icon, Pressable } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { CarView } from './CarView';
import { RootState } from '../../store/configureStore';
import { Link, router } from 'expo-router';
import { ITruck } from '../../api/truck/Truck';

type CarScreenContentProps = {
    isSelectionMode: boolean;
};

export default function CarScreenContent(props: CarScreenContentProps) {
  const { isSelectionMode } = props;
  
  const dispatch = useDispatch()

  const cars = useSelector((state: RootState) => state.garage.cars)
  
  const itemPressHandler = (car: ITruck) => {
    if (isSelectionMode){
      router.back();
    }
  };
  
  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => itemPressHandler(item)} >
        <CarView truck={item as ITruck} />
        <View style={styles.separator} />
    </Pressable>
  );
  
  let content = (
    <FlatList px={"4"} data={cars} renderItem={renderItem} />
  )

  if (cars.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Text
          style={styles.getStartedText}>
          Список автомобилей пуст
        </Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container} >
      {content}
      <Link href="/EditCarModal" asChild>
        <Fab
          position="absolute"
          placement='bottom-right'
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          renderInPortal={false}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd'
  },
});

