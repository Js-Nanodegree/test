import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native'
import * as React from 'react';
import HomeScreen from './container/home';
import ListScreen from './container/listScreen';
import CardScreen from './container/cardScreen';
import Settings from './container/settings';
import { Provider } from 'react-redux'
import MyTheme from './theme';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <NavigationContainer theme={MyTheme} >
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={() => ({
            headerShown: false,
          })}
        />
        {/* <Stack.Screen
          name="Settings"
          component={CardScreen}
          options={() => ({
            headerShown: false,
          })}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <Navigate />
      </PersistGate>
    </Provider>
  );
}

export default App;