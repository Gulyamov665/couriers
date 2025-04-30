import {useDispatch} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {logout, setIsAuthenticated, setUser} from '../store/slices/auth';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({setUser, logout, setIsAuthenticated}, dispatch);
};
