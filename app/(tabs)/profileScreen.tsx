import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootState } from '../../store/configureStore';
import { Gender } from '../../api/GenderEnum';

export default function ProfileScreen() {
  
  let content = undefined;
  
  const profile = useSelector((state: RootState) => state.profile);
  const phoneNumber = profile.phoneNumber;

  if (profile.id) {
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

    //const birthdayMoment = moment(profile.birthDate);
    //const isBirthdayValid = profile.birthDate && birthdayMoment.isValid();

    // content = (
    //   <View style={{ width: deviceWidth }}>
    //     <VStack space={3}>
    //       <HStack space={5} my={3}>
    //         <Center>
    //           <Icon as={<MaterialIcons name="account-circle"/>} size="xl" />
    //         </Center>
    //         <VStack>
    //           <Text fontSize="xl">{profile.name} {profile.surname}</Text>
    //           <Text>{profile.patronymic}</Text>
    //         </VStack>
    //       </HStack>
    //       <ProfileItem title={"Номер телефона"} value={!phoneNumber || phoneNumber === '' ? 'Не указано' : phoneNumber}/>
    //       {Platform.OS === 'web' ? null : <ProfileItem title={"Дата рождения"} value={isBirthdayValid ? birthdayMoment.format('DD MMMM YYYY') : 'Не указано'}/> }
    //       <ProfileItem title={"Пол"} value={genderValue}/>
    //     </VStack>
    //   </View>
    // )
  }
  
  if (!profile) {
    content = (
      <View>
        <Text
          style={styles.centredText}>
          Данные ещё не заполнены
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {content}
      {/* <Button minW={200} my={5} variant="outline" onPress={toggleColorMode}>{`Включить ${useColorModeValue('тёмную', 'светлую')} тему`}</Button>
      <Fab
        position="absolute"
        placement='bottom-right'
        icon={<Icon color="white" as={<MaterialIcons name="edit"/>} size="sm" />}
        onPress={editOnPressHandler}
        renderInPortal={false}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  centredText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
