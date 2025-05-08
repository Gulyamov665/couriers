import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import {useAuthMutation} from '../../services/auth/authApi';
import {formatPhoneNumber, handleChange} from '../../tools/tools';

export const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [auth, {isLoading, error}] = useAuthMutation();
  const [password, setPassword] = useState('');
  const errorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error && phone.length === 13) {
      Animated.timing(errorAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [error, phone.length]);

  const handleLogin = async () => {
    await auth({phone, password}).unwrap();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>

      <TextInput
        style={styles.input}
        textContentType="telephoneNumber"
        placeholder="Номер телефона"
        placeholderTextColor="#888"
        value={formatPhoneNumber(phone)}
        onChangeText={num => handleChange(num, setPhone)}
        keyboardType="phone-pad"
        autoCapitalize="none"
        maxLength={16}
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Animated.View style={{opacity: errorAnim, minHeight: 22}}>
        {error ? (
          <Text style={styles.errorText}>
            Неверный номер телефона или пароль
          </Text>
        ) : null}
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Войти</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    color: '#111827',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#111',
  },
  button: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 15,
    marginBottom: 3,
    textAlign: 'center',
  },
});
