import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessToken} from '../app/tools/tools';
import {useActions} from './useActions';
import {authState, setUser} from '../store/slices/auth';
import {jwtDecode} from 'jwt-decode';
import {CustomJwtPayload} from '../store/middlewares/auth';
import {useLazyMeQuery} from '../app/services/auth/authApi';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const {setIsAuthenticated} = useActions();
  const {isAuthenticated} = useSelector(authState);
  const [isChecking, setIsChecking] = useState(true);
  const [me, {data}] = useLazyMeQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        setIsAuthenticated(!!token);
        if (token) {
          const tokenDecode = jwtDecode<CustomJwtPayload>(token.access);
          await me(tokenDecode.user_id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data])

  return {isAuthenticated, isChecking};
};
