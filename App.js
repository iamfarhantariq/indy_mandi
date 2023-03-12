/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import store from './src/store';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigations/AppNavigation';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AppStyle from './src/assets/styles/AppStyle';
import { SheetProvider } from 'react-native-actions-sheet';
import './src/helpers/sheets';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Sending']);

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
          <SheetProvider>
            <AppNavigation />
          </SheetProvider>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
