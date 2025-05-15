import {useDispatch} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {
  clearUser,
  setFCMToken,
  setIsAuthenticated,
  setUser,
  setUserInfo,
} from '../store/slices/auth';
import {logout} from '@store/thunks/authThunk';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {setUser, clearUser, setIsAuthenticated, setFCMToken, logout, setUserInfo},
    dispatch,
  );
};
