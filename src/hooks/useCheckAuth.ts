import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../app/tools/tools";
import { useActions } from "./useActions";
import { authState } from "../store/slices/auth";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../store/middlewares/auth";
import { useLazyMeQuery } from "@store/services/auth/authApi";

export const useCheckAuth = () => {
  const { setIsAuthenticated, setUser, setUserInfo } = useActions();
  const { isAuthenticated } = useSelector(authState);
  const [isChecking, setIsChecking] = useState(true);
  const [me] = useLazyMeQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        setIsAuthenticated(!!token);
        if (token) {
          const tokenDecode = jwtDecode<CustomJwtPayload>(token.access);
          const user = await me(tokenDecode.user_id);
          if (user.data) setUserInfo(user.data);
          setUser(tokenDecode);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  return { isAuthenticated, isChecking };
};
