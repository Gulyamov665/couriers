import {useFocusEffect} from '@react-navigation/native';
import {AppState} from 'react-native';
import {useCallback, useRef} from 'react';

export const useSmartRefetch = (refetch: () => void) => {
  const appState = useRef(AppState.currentState);

  useFocusEffect(
    useCallback(() => {
      refetch();

      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          refetch(); // пользователь вернулся в приложение
        }
        appState.current = nextAppState;
      });

      return () => {
        subscription.remove();
      };
    }, [refetch]),
  );
};
