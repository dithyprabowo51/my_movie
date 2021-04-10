import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Components
import ListMovies from './containers/ListMovies.js'
import MovieDetail from './containers/MovieDetail.js'

// Redux
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ListMovies" component={ListMovies} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}