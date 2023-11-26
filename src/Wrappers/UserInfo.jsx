import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, BottomSheet, Icon, ListItem } from '@rneui/base';
import { auth } from '../api/db';
import { ROUTES } from '../constants/navigation.constants';
import { useUser } from '../hooks/auth';
import { SIZE, FONT, COLORS, FONT_SIZE } from '../constants/style.contstants';
import FormChangePassword from '../Components/FormChangePassword';

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
      <View style={styles.header}>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{ uri: `https://picsum.photos/seed/${user.uid}/200/200` }}
            size={60}
            rounded
            onPress={() => setVisible(true)}
            containerStyle={styles.avatar}
          />
        </View>
      </View>

      <View style={styles.childrenContainer}>{children}</View>

      <BottomSheet
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <FormChangePassword />
        <ListItem onPress={doLogout}>
          <Icon name="logout" color={COLORS.text}></Icon>
          <ListItem.Content>
            <ListItem.Title style={styles.logout}>Log out</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "flex-end"
  },
  header: {
    backgroundColor: COLORS.main,
    padding: SIZE.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  logout: {
    ...FONT.h1,
    color: COLORS.danger,
    fontSize: FONT_SIZE.lg
  },
  childrenContainer: {
    paddingHorizontal: SIZE.sm
  },
  avatarContainer: {
    width: "50%",
  },
  emailContainer: {
    width: "50%"
  },
  email: {
    ...FONT.h4,
    color: COLORS.highlight
  }
})

export default UserInfo