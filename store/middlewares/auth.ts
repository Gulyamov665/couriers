import {userAuth} from '../../app/services/auth/authApi';
import {setUser} from '../slices/auth';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import listenerMiddleware from './listenerMiddleware';
import * as Keychain from 'react-native-keychain'; // Импортируем Keychain

interface CustomJwtPayload extends JwtPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_user: boolean;
  is_vendor: boolean;
  vendor: string | null;
}

// Слушаем успешную авторизацию
listenerMiddleware.startListening({
  matcher: userAuth.endpoints.auth.matchFulfilled,
  effect: async (action, listenerApi) => {
    const {access, refresh} = action.payload;

    try {
      // Сохраняем токены в Keychain
      await Keychain.setGenericPassword(
        'auth',
        JSON.stringify({access, refresh}),
      );

      const user = jwtDecode<CustomJwtPayload>(access);
      listenerApi.dispatch(setUser(user));
    } catch (error) {
      console.error('Ошибка при сохранении токенов в Keychain', error);
    }
  },
});

// Слушаем начало авторизации (очищаем ошибки)
// listenerMiddleware.startListening({
//   matcher: userAuth.endpoints.auth.matchPending,
//   effect: async (_, listenerApi) => {
//     listenerApi.dispatch(regError({message: '', code: 0}));
//   },
// });

// // Слушаем ошибку авторизации
// listenerMiddleware.startListening({
//   matcher: userAuth.endpoints.auth.matchRejected,
//   effect: async (action, listenerApi) => {
//     const errorPayload = action.payload as {data?: {message?: string}};
//     const errorMessage = errorPayload.data?.message || 'Что-то пошло не так';
//     listenerApi.dispatch(regError({message: errorMessage, code: 400}));

//     // При ошибке можно удалить токены (если надо)
//     try {
//       await Keychain.resetGenericPassword();
//     } catch (error) {
//       console.error('Ошибка при очистке токенов из Keychain', error);
//     }
//   },
// });

export const authMiddleware = listenerMiddleware.middleware;
