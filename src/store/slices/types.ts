import { CustomJwtPayload } from "@store/middlewares/auth";
import { UserInfoType } from "../services/orders/types";

export type AuthInitialState = {
  user: CustomJwtPayload | null;
  token: boolean;
  isAuthenticated: boolean;
  fcmToken: string;
  userInfo: UserInfoType | null;
};

export interface NotificationState {
  lastOrderId?: number | null;
}
