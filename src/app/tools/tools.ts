import { jwtDecode } from "jwt-decode";
import * as Keychain from "react-native-keychain";

export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (credentials) {
    const token = JSON.parse(credentials.password);
    return token;
  }
  return null;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 12); // максимум 12 цифр (+998934733223)
  let result = "";

  if (digits.length > 0) result += "+" + digits.slice(0, 3); // код страны
  if (digits.length >= 4) result += " " + digits.slice(3, 5); // код оператора
  if (digits.length >= 6) result += " " + digits.slice(5, 8); // первая часть номера
  if (digits.length >= 9) result += " " + digits.slice(8, 12); // вторая часть номера

  return result.trim();
};

export const handleChange = (text: string, setPhone: React.Dispatch<React.SetStateAction<string>>) => {
  // Удаляем только пробелы, но оставляем +
  const digits = text.replace(/ /g, "");
  setPhone(digits.startsWith("+") ? digits : "+" + digits);
};

export const getUser = () => {};

export const queryLogger =
  (name: string) =>
  async (arg: any, { queryFulfilled }: { queryFulfilled: Promise<any> }) => {
    console.log(`Query Started: ${name}`, arg);
    try {
      const result = await queryFulfilled;
      console.log(`Query Success: ${name}`, result.data);
    } catch (error) {
      console.error(`Query Error: ${name}`, error);
    }
  };
