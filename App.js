/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import store from './src/store';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigations/AppNavigation';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AppStyle from './src/assets/styles/AppStyle';
import { SheetProvider } from 'react-native-actions-sheet';
import './src/helpers/sheets';
import { LogBox } from 'react-native';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';

let persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <SheetProvider>
              <AppNavigation />
            </SheetProvider>
          </View>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
