import { Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { Text, Center, HStack, VStack, Fab, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import moment from 'moment';
import { View } from '../../components/Themed';
import { RootState } from '../../store/configureStore';
import { Gender } from '../../api/GenderEnum';
import { TitleValueItem } from '../../components/screenItems/TitleValueItem';

export default function ProfileTab() {
  
  let content = (
    <Center flex={1} alignItems='center'>
      <Text fontSize={17}>
        Данные ещё не заполнены
      </Text>
    </Center>
  )
  
  let profile = useSelector((state: RootState) => state.profile);
  const phoneNumber = profile.phoneNumber;
  
  if (profile) {
    let genderValue = 'Не указано';
    if (profile.gender === Gender.Woman) genderValue = 'Женский';
    if (profile.gender === Gender.Man) genderValue = 'Мужской';

    const birthdayMoment = moment(profile.birthDate);
    const isBirthdayValid = profile.birthDate && birthdayMoment.isValid();

    content = (
      <View style={{ width: '90%' }}>
        <VStack space={3}>
          <HStack space={5} my={3}>
            <Center>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </Center>
            <VStack>
              <Text fontSize="xl">{profile.name} {profile.surname}</Text>
              <Text>{profile.patronymic}</Text>
            </VStack>
          </HStack>
          <TitleValueItem title={"Номер телефона"} value={!phoneNumber || phoneNumber === '' ? 'Не указано' : phoneNumber}/>
          {Platform.OS === 'web' ? null : <TitleValueItem title={"Дата рождения"} value={isBirthdayValid ? birthdayMoment.format('DD MMMM YYYY') : 'Не указано'}/> }
        </VStack>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {content}
      <Link href="/EditProfileModal" asChild>
        <Fab
          position="absolute"
          placement='bottom-right'
          icon={<Icon color="white" as={<MaterialIcons name="edit"/>} size="sm" />}
          renderInPortal={false}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});