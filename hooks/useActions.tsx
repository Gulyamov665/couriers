import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { logout, setUser } from '../store/slices/auth'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ setUser, logout }, dispatch)
}
