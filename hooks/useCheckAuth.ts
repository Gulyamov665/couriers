// import {useSelector} from 'react-redux';
// import {getAccessToken} from '../app/tools/tools';
// import {useActions} from './useActions';
// import {authState} from '../store/slices/auth';

// export const useCheckAuth = async () => {
//   const {setIsAuthenticated} = useActions();
//   const {isAuthenticated} = useSelector(authState);

//   const token = await getAccessToken();
//   setIsAuthenticated(token);

//   return isAuthenticated;
// };
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAccessToken} from '../app/tools/tools';
import {useActions} from './useActions';
import {authState} from '../store/slices/auth';

export const useCheckAuth = () => {
  const {setIsAuthenticated} = useActions();
  const {isAuthenticated} = useSelector(authState);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated]);

  return {isAuthenticated, isChecking};
};
