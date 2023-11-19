import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, BottomSheet, ListItem } from '@rneui/base';
import { auth } from '../api/db';
import { ROUTES } from '../constants/navigation.constants';
import { useUser } from '../hooks/auth';

const UserInfo = ({ children }) => {
  const [user, setUser] = useUser();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation()

  const doLogout = async () => {
    await auth.signOut();
    auth.currentUser = null;
    setUser(null);
  };

  useEffect(() => {
    if (!user) navigation.navigate(ROUTES.login);
  }, [user, navigation]);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text>{user.email}</Text>
        <Avatar
          source={{ uri: `https://picsum.photos/seed/${user.uid}/200/200` }}
          size={60}
          rounded
          onPress={() => setVisible(true)}
          containerStyle={{ alignSelf: 'flex-end' }}
        />
      </View>
      <View>{children}</View>
      <BottomSheet
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <ListItem onPress={doLogout}>
          <ListItem.Content>
            <ListItem.Title>Log out</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})

export default UserInfo