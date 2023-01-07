import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar} from 'react-native';
import StyleApp from '../assets/styles/AppStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from '../screens/home/Home';
import TabHomeActive from '../assets/images/tab/home-active.svg';
import TabHomeInActive from '../assets/images/tab/home-inactive.svg';
import TabExploreActive from '../assets/images/tab/explore-active.svg';
import TabExploreInActive from '../assets/images/tab/explore-inactive.svg';
import TabProfileActive from '../assets/images/tab/profile-active.svg';
import TabProfileInActive from '../assets/images/tab/profile-inactive.svg';
import AppStyle from '../assets/styles/AppStyle';
import Explore from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import MainCategoryScreen from '../screens/mainCategory/MainCategoryScreen';
import Blogs from '../screens/blogs/Blogs';
import AppConfig from '../helpers/config';
import BlogContent from '../screens/blogContent/BlogContent';

const Tab = createBottomTabNavigator();

function AppTabs() {
    const navigation = useNavigation();

    function handleBackButtonClick() {
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

    const tabScreenProps = {
        tabBarActiveTintColor: StyleApp.colorSet.primaryColorC,
        tabBarInactiveTintColor: StyleApp.colorSet.borderLightGrayColor,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
            marginTop: 20,
            fontSize: 11
        },
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    height: AppConfig.bottomTabsHeight,
                    backgroundColor: AppStyle.colorSet.primaryColorA,
                    alignItems: 'center',
                    paddingTop: 20,
                    flexDirection: 'row'
                },
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Home',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabHomeActive />
                        ) : (
                            <TabHomeInActive />
                        ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Explore',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabExploreActive />
                        ) : (
                            <TabExploreInActive />
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProflieStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Profile',

                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabProfileActive />
                        ) : (
                            <TabProfileInActive />
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={Home} />
            <HomeStack.Screen name="MainCategoryScreen" component={MainCategoryScreen} />
            <ExploreStack.Screen name="BlogContentScreen" component={BlogContent} />
        </HomeStack.Navigator>
    );
}

const ExploreStack = createNativeStackNavigator();

const ExploreStackScreen = ({ navigation, route }) => {
    return (
        <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
            <ExploreStack.Screen name="ExploreScreen" component={Explore} />
            <ExploreStack.Screen name="BlogsScreen" component={Blogs} />
            <ExploreStack.Screen name="BlogContentScreen" component={BlogContent} />
        </ExploreStack.Navigator>
    );
}

const ProflieStack = createNativeStackNavigator();

const ProflieStackScreen = ({ navigation, route }) => {
    return (
        <ProflieStack.Navigator screenOptions={{ headerShown: false }}>
            <ProflieStack.Screen name="ProfileScreen" component={Profile} />
        </ProflieStack.Navigator>
    );
}

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
    // const isDarkMode = useColorScheme() === 'dark';
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
                barStyle="dark-content"
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
