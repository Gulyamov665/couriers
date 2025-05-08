import {UserInfoType} from '../../app/services/orders/types';

export type AuthInitialState = {
  user: UserInfoType | null;
  token: boolean;
  isAuthenticated: boolean;
  fcmToken: string;
};
