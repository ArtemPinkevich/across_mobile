import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function ProfileScreen() {
  
  let content = undefined;
  let profile = undefined;
  
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
