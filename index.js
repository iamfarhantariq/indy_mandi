/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AppStyle from './src/assets/styles/AppStyle';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    Text.defaultProps.style = { fontFamily: AppStyle.fontFamily.Noto.regular.family }
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
    TextInput.defaultProps.style = { fontFamily: AppStyle.fontFamily.Noto.regular.family }
}
