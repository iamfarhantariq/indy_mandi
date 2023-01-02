import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, useColorScheme, ImageBackground } from 'react-native';
import StyleApp from '../assets/styles/AppStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
// import LoadingScreen from '../components/LoadingScreen';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
// import Toast, {BaseToast} from 'react-native-toast-message';
// import {setActivityIndicator} from '../features/appconfig/appconfigSlice';
import SplashScreen from 'react-native-splash-screen';
import Home from '../screens/home/Home';
import TabHomeActive from '../assets/images/tab/home-active.svg';
import TabHomeInActive from '../assets/images/tab/home-inactive.svg';

const Tab = createBottomTabNavigator();

function AppTabs() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    function handleBackButtonClick() {
        dispatch(setActivityIndicator(false));
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            BackHandler.exitApp();
        }
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: '#091E30',
                    padding: 10,
                },
                title: '',
                tabBarActiveTintColor: StyleApp.colorSet.primaryColorC,
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabHomeActive/>
                        ) : (
                            <TabHomeInActive/>
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen({ navigation, route }) {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={Home} />
        </HomeStack.Navigator>
    );
}

// const FavoriteStack = createNativeStackNavigator();

// function FavoriteStackScreen() {
//     return (
//         <FavoriteStack.Navigator screenOptions={{ headerShown: false }}>
//             <FavoriteStack.Screen name="FavoriteScreen" component={Favorite} />
//             <FavoriteStack.Screen name="ShareTrip" component={ShareTrip} />
//         </FavoriteStack.Navigator>
//     );
// }

// const ProfileStack = createNativeStackNavigator();

// function ProfileStackScreen() {
//     return (
//         <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
//             <ProfileStack.Screen name="ProfileMainScreen" component={ProfileMain} />
//         </ProfileStack.Navigator>
//     );
// }

const AppStack = createNativeStackNavigator();

function AppNavigation() {
    const isDarkMode = useColorScheme() === 'dark';
    // const appconfig = useSelector(state => state.appconfig);

    // const CustomToast = (props) => {
    //     return <BaseToast
    //         {...props}
    //         text2NumberOfLines={2}
    //         style={{ borderLeftColor: props.type === 'error' ? 'red' : 'gray' }}
    //         text1Style={{ fontSize: StyleApp.fontSet.normal, fontFamily: StyleApp.fontFamily.popins.bold.family }}
    //         text2Style={{ fontSize: StyleApp.fontSet.small, fontFamily: StyleApp.fontFamily.popins.regular.family }}
    //     />
    // }

    // const toastConfig = {
    //     info: (props) => (
    //         <CustomToast {...props} />
    //     ),
    //     error: (props) => (
    //         <CustomToast {...props} />
    //     ),
    // }

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <React.Fragment>
            <StatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle={'light-content'}
            />
            <NavigationContainer>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen
                        initialRouteName="Home"
                        name="AppTabs"
                        component={AppTabs}
                    />
                </AppStack.Navigator>
            </NavigationContainer>

            {/* <LoadingScreen />

            <Toast
                config={toastConfig}
                autoHide={true}
                visibilityTime={6000}
                position="bottom"
                bottomOffset={20}

            /> */}
        </React.Fragment>
    );
}

export default AppNavigation;
