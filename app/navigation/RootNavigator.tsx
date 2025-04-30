import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import {LoginScreen} from '../screens/login/LoginScreen';
import {ErrorBoundary} from '../config/ErrorBoundary';
import {useCheckAuth} from '../../hooks/useCheckAuth';
import {Loader} from '../components/Loader';

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
  const {isAuthenticated, isChecking} = useCheckAuth();

  if (isChecking) return <Loader />;

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
