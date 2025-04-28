import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {useAuthMutation} from '../../services/auth/authApi';

export const LoginScreen = () => {
  //   const navigation =
  //     useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [phone, setPhone] = useState('');
  const [auth, {isLoading}] = useAuthMutation();
  const [password, setPassword] = useState('');

  // const {setUser} = useActions();

  //   const fadeAnim = useRef(new Animated.Value(0)).current // Начальное значение прозрачности = 0
  //   const translateY = useRef(new Animated.Value(20)).current // Начальное значение сдвига вниз

  //   useEffect(() => {
  //     Animated.parallel([
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 600,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(translateY, {
  //         toValue: 0,
  //         duration: 600,
  //         useNativeDriver: true,
  //       }),
  //     ]).start()
  //   }, [])

  const handleLogin = async () => {
    await auth({phone, password}).unwrap();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

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
});
