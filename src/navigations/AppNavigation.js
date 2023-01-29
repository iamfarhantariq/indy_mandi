import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import StyleApp from '../assets/styles/AppStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from '../screens/home/Home';
import TabHomeActive from '../assets/images/tab/home-active.svg';
import TabHomeInActive from '../assets/images/tab/home-inactive.svg';
import TabExploreActive from '../assets/images/tab/explore-active.svg';
import TabExploreInActive from '../assets/images/tab/explore-inactive.svg';
import TabAnalyticsActive from '../assets/images/tab/analytics-active.svg';
import TabAnalyticsInActive from '../assets/images/tab/analytics-inactive.svg';
import TabChatActive from '../assets/images/tab/chat-active.svg';
import TabChatInActive from '../assets/images/tab/chat-inactive.svg';
import TabMyShopActive from '../assets/images/tab/myshop-active.svg';
import TabMyShopInActive from '../assets/images/tab/myshop-inactive.svg';
import TabCartActive from '../assets/images/tab/cart-active.svg';
import TabCartInActive from '../assets/images/tab/cart-inactive.svg';
import TabProfileActive from '../assets/images/tab/profile-active.svg';
import TabProfileInActive from '../assets/images/tab/profile-inactive.svg';
import AppStyle from '../assets/styles/AppStyle';
import Explore from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import MainCategoryScreen from '../screens/mainCategory/MainCategoryScreen';
import Blogs from '../screens/blogs/Blogs';
import AppConfig from '../helpers/config';
import BlogContent from '../screens/blogContent/BlogContent';
import NestedCategoryScreen from '../screens/nestedCategories/NestedCategoryScreen';
import SellerStories from '../screens/sellerStories/SellerStories';
import SellerStoryContent from '../screens/sellerStoryContent/SellerStoryContent';
import EditorChoiceScreen from '../screens/editorChoice/EditorChoiceScreen';
import CuratedForYou from '../screens/curatedForYou/CuratedForYou';
import ProductDetail from '../screens/productDetail/ProductDetail';
import Store from '../screens/store/Store';
import ContactUs from '../screens/contactUs/ContactUs';
import RaiseDispute from '../screens/raiseDispute/RaiseDispute';
import RenderContentScreen from '../screens/renderContent/RenderContentScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import MyShop from '../screens/myShop/MyShop';
import AnalyticsPage from '../screens/analytics/AnalyticsPage';
import Cart from '../screens/cart/Cart';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
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
                name="Analytics"
                component={AnalyticsStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Analytics',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabAnalyticsActive />
                        ) : (
                            <TabAnalyticsInActive />
                        ),
                }}
            />
             <Tab.Screen
                name="Chat"
                component={ChatStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Chat',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabChatActive />
                        ) : (
                            <TabChatInActive />
                        ),
                }}
            />
            <Tab.Screen
                name="MyShop"
                component={MyShopStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'My Shop',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabMyShopActive />
                        ) : (
                            <TabMyShopInActive />
                        ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStackScreen}
                options={{
                    ...tabScreenProps,
                    title: 'Cart',
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ? (
                            <TabCartActive />
                        ) : (
                            <TabCartInActive />
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
            <HomeStack.Screen name="BlogsScreen" component={Blogs} />
            <HomeStack.Screen name="SellerStoriesScreen" component={SellerStories} />
        </HomeStack.Navigator>
    );
}

const ExploreStack = createNativeStackNavigator();

const ExploreStackScreen = ({ navigation, route }) => {
    return (
        <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
            <ExploreStack.Screen name="ExploreScreen" component={Explore} />
        </ExploreStack.Navigator>
    );
}

const AnalyticsStack = createNativeStackNavigator();

const AnalyticsStackScreen = ({ navigation, route }) => {
    return (
        <AnalyticsStack.Navigator screenOptions={{ headerShown: false }}>
            <AnalyticsStack.Screen name="AnalyticsScreen" component={AnalyticsPage} />
        </AnalyticsStack.Navigator>
    );
}

const ChatStack = createNativeStackNavigator();

const ChatStackScreen = ({ navigation, route }) => {
    return (
        <ChatStack.Navigator screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
        </ChatStack.Navigator>
    );
}

const MyShopStack = createNativeStackNavigator();

const MyShopStackScreen = ({ navigation, route }) => {
    return (
        <MyShopStack.Navigator screenOptions={{ headerShown: false }}>
            <MyShopStack.Screen name="MyShopScreen" component={MyShop} />
        </MyShopStack.Navigator>
    );
}

const CartStack = createNativeStackNavigator();

const CartStackScreen = ({ navigation, route }) => {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen name="CartScreen" component={Cart} />
        </CartStack.Navigator>
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
                    <AppStack.Screen name="BlogContentScreen" component={BlogContent} />
                    <AppStack.Screen name="NestedCategoriesTypeScreen" component={NestedCategoryScreen} />
                    <AppStack.Screen name="SellerStoryContentScreen" component={SellerStoryContent} />
                    <AppStack.Screen name="EditorChoiceScreen" component={EditorChoiceScreen} />
                    <AppStack.Screen name="CuratedForYouScreen" component={CuratedForYou} />
                    <AppStack.Screen name="ProductDetailScreen" component={ProductDetail} />
                    <AppStack.Screen name="StoreScreen" component={Store} />
                    <AppStack.Screen name="ContactUs" component={ContactUs} />
                    <AppStack.Screen name="RaiseDispute" component={RaiseDispute} />
                    <AppStack.Screen name="RenderContentScreen" component={RenderContentScreen} />
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
