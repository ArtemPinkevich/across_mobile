import { Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Text, Center, HStack, VStack, Icon, Fab, FabIcon, EditIcon, FabLabel } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View } from '../../components/Themed';
import { RootState } from '../../store/configureStore';
import { Gender } from '../../api/GenderEnum';
import { TitleValueItem } from '../../components/screenItems/TitleValueItem';

export default function ProfileScreen() {
  
  let content = undefined;
  
  let profile = useSelector((state: RootState) => state.profile);
  const phoneNumber = profile.phoneNumber;
  
  const editOnPressHandler = () => {
    router.push('/modal');
  }


  if (profile) {
    let genderValue = 'Не указано';
    if (profile.gender === Gender.Woman) genderValue = 'Женский';
    if (profile.gender === Gender.Man) genderValue = 'Мужской';

    content = (
      <View>
        <Text
          style={styles.centredText}>
          {profile.name}
        </Text>
      </View>
    )

    // const birthdayMoment = moment(profile.birthDate);
    // const isBirthdayValid = profile.birthDate && birthdayMoment.isValid();

    content = (
      <View style={{ width: '90%' }}>
        <VStack space="md">
          <HStack space="2xl" my="$3">
            <Center>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </Center>
            <VStack>
              <Text size="xl">{profile.name} {profile.surname}</Text>
              <Text>{profile.patronymic}</Text>
            </VStack>
          </HStack>
          <TitleValueItem title={"Номер телефона"} value={!phoneNumber || phoneNumber === '' ? 'Не указано' : phoneNumber}/>
          {/* {Platform.OS === 'web' ? null : <TitleValueItem title={"Дата рождения"} value={isBirthdayValid ? birthdayMoment.format('DD MMMM YYYY') : 'Не указано'}/> } */}
          <TitleValueItem title={"Пол"} value={genderValue}/>
        </VStack>
      </View>
    )
  }
  
  if (!profile) {
    content = (
      <Center flex={1} alignItems='center'>
        <Text
          style={styles.centredText}>
          Данные ещё не заполнены
        </Text>
      </Center>
    )
  }

  return (
    <View style={styles.container}>
      {content}
      {/* <Button minW={200} my={5} variant="outline" onPress={toggleColorMode}>{`Включить ${useColorModeValue('тёмную', 'светлую')} тему`}</Button> */}
      <Fab
        position="absolute"
        placement='bottom right'
        size="lg"
        onPress={editOnPressHandler}
      >
        <FabIcon as={EditIcon} />
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  centredText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});