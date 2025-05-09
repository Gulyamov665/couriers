import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {PaperProvider} from 'react-native-paper';
import {RootNavigator} from './app/navigation/RootNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <Provider store={store}>
            <PaperProvider>
              <RootNavigator />
            </PaperProvider>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}
