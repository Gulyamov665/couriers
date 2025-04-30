import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {PaperProvider} from 'react-native-paper';
import {RootNavigator} from './app/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNotification} from './hooks/useNotification';

export default function App() {
  useNotification();

  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <RootNavigator />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}
