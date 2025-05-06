import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useActions} from '../../hooks/useActions';
import {useNotification} from '../../hooks/useNotification';
import * as Keychain from 'react-native-keychain';

export const ProfileScreen = () => {
  const {logout} = useActions();
  const token = useNotification();
  const user = {
    name: 'Убегай Сабир',
    email: 'ubejal@example.com',
    avatar: 'https://i.pravatar.cc/300', // пример аватарки
  };

  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.separator} />
      <TextInput
        value={token || ''}
        style={styles.tokenInput}
        editable={true}
        selectTextOnFocus={true}
        multiline={true}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    width: '100%',
    marginVertical: 30,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tokenInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    minHeight: 50,
  },
});
