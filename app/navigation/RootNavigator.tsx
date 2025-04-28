import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import {LoginScreen} from '../screens/login/LoginScreen';
import {useSelector} from 'react-redux';
import {authState} from '../../store/slices/auth';
import {ErrorBoundary} from '../config/ErrorBoundary';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Orders: undefined;
  OrdersList: undefined;

  Home: undefined;
  OrderDetails: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {isAuthenticated} = useSelector(authState);

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={BottomTabs} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};
