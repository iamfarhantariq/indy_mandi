import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
    }
}

export const getFCMToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log({ fcmToken }, 'old token');

    if (!fcmToken) {
        try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            if (token) {
                console.log({ token }, 'new token');
                AsyncStorage.setItem('fcmToken', token);
            }
        } catch (error) {
            console.log({ error }, 'error in fcmToken');
        }
    }
}

export const NotificationListener = () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage,
            );
        });

    messaging().onMessage(async remoteMessage => {
        console.log('message on foreground state', remoteMessage);
    })
}