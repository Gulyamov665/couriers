import React, { useEffect } from 'react'
// import * as Notifications from 'expo-notifications'
import { Provider } from 'react-redux'
import { store } from './store'
import { PaperProvider } from 'react-native-paper'
// import BottomTabs from './app/navigation/BottomTabs'
// import { NavigationContainer } from '@react-navigation/native'
// import { configureNotificationChannel } from './app/tools/tools'
import { RootNavigator } from './app/navigation/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// })

export default function App() {
  useEffect(() => {
    // configureNotificationChannel()
    console.log('first render')
  }, [])

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
  )
}
