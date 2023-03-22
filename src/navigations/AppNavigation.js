import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import StyleApp from '../assets/styles/AppStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
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
import ChatDetail from '../screens/chatDetail/ChatDetail';
import UserScreen from '../screens/userScreen/UserScreen';
import AccountSettings from '../screens/accountSettings/AccountSettings';
import OrderEnquiries from '../screens/orderEnquiries/OrderEnquiries';
import WishList from '../screens/wishtList/WishList';
import WishListDetail from '../screens/wishListDetail/WishListDetail';
import CreateWishList from '../screens/createWishList/CreateWishList';
import Addresses from '../screens/addresses/Addresses';
import CreateAddress from '../screens/createAddress/CreateAddress';
import PaymentHistory from '../screens/paymentHistory/PaymentHistory';
import Invoice from '../screens/invoice/Invoice';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import ProfileSettings from '../screens/profileSettings/ProfileSettings';
import IndyViews from '../screens/indyViews/IndyViews';
import UploadAd from '../screens/uploadAd/UploadAd';
import CropImage from '../screens/cropImage/CropImage';
import PaymentScreen from '../screens/paymentScreen/PaymentScreen';
import BecomeSeller from '../screens/becomeSeller/BecomeSeller';
import BuyPlan from '../screens/buyPlan/BuyPlan';
import PaymentSubscription from '../screens/paymentSubscription/PaymentSubscription';
import ManageProducts from '../screens/manageProducts/ManageProducts';
import AddProduct from '../screens/addProduct/AddProduct';
import ManageCollection from '../screens/manageCollection/ManageCollection';
import CreateCollection from '../screens/createCollection/CreateCollection';
import LoadingScreen from '../screens/LoadingScreen';
import VerifyEmail from '../screens/verifyEmail/VerifyEmail';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../store/slices/loginConfigSlice';
import { useState } from 'react';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import ResetPasswordWithCode from '../screens/resetPasswordWithCode/ResetPasswordWithCode';
import UserImage from '../screens/userImage/UserImage';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
    const navigation = useNavigation();
    const loginConfig = useSelector(getLoginConfig);
    const [role, setRole] = useState(null);

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

    useEffect(() => {
        if (loginConfig?.user) {
            setRole(loginConfig?.user?.role);
        } else {
            setRole(null);
        }
    }, [loginConfig]);

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
            {(role === 's' || role === 'v') && <Tab.Screen
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
            />}
            {role && <Tab.Screen
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
            />}
            {(role === 's' || role === 'v') && <Tab.Screen
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
            />}
            {role === 'u' && <Tab.Screen
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
            />}
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
    const loginConfig = useSelector(getLoginConfig);

    return (
        <ProflieStack.Navigator initialRouteName={loginConfig?.isLogin && loginConfig?.isAutherized ? 'UserScreen' : 'ProfileScreen'}
            screenOptions={{ headerShown: false }}>
            <ProflieStack.Screen name='ProfileScreen' component={Profile} />
            <ProflieStack.Screen name='UserScreen' component={UserScreen} />
        </ProflieStack.Navigator>
    );
}

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
    // const isDarkMode = useColorScheme() === 'dark';

    const CustomToast = (props) => {
        return <BaseToast
            {...props}
            text2NumberOfLines={2}
            style={{ borderLeftColor: props.type === 'error' ? AppStyle.colorSet.redColor : AppStyle.colorSet.textSecondary }}
            text1Style={{ fontSize: 14, fontWeight: '600' }}
            text2Style={{ fontSize: 12, fontWeight: '400' }}
        />
    }

    const toastConfig = {
        info: (props) => (
            <CustomToast {...props} />
        ),
        error: (props) => (
            <CustomToast {...props} />
        ),
    }

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
                    <AppStack.Screen name="ChatDetail" component={ChatDetail} />
                    <AppStack.Screen name="AccountSettings" component={AccountSettings} />
                    <AppStack.Screen name="OrderEnquiries" component={OrderEnquiries} />
                    <AppStack.Screen name="WishList" component={WishList} />
                    <AppStack.Screen name="WishListDetail" component={WishListDetail} />
                    <AppStack.Screen name="CreateWishList" component={CreateWishList} />
                    <AppStack.Screen name="Addresses" component={Addresses} />
                    <AppStack.Screen name="CreateAddress" component={CreateAddress} />
                    <AppStack.Screen name="PaymentHistory" component={PaymentHistory} />
                    <AppStack.Screen name="Invoice" component={Invoice} />
                    <AppStack.Screen name="ResetPassword" component={ResetPassword} />
                    <AppStack.Screen name="ProfileSettings" component={ProfileSettings} />
                    <AppStack.Screen name="IndyViews" component={IndyViews} />
                    <AppStack.Screen name="UploadAd" component={UploadAd} />
                    <AppStack.Screen name="CropImage" component={CropImage} />
                    <AppStack.Screen name="PaymentScreen" component={PaymentScreen} />
                    <AppStack.Screen name="BecomeSeller" component={BecomeSeller} />
                    <AppStack.Screen name="BuyPlan" component={BuyPlan} />
                    <AppStack.Screen name="PaymentSubscription" component={PaymentSubscription} />
                    <AppStack.Screen name="ManageProducts" component={ManageProducts} />
                    <AppStack.Screen name="AddProduct" component={AddProduct} />
                    <AppStack.Screen name="ManageCollection" component={ManageCollection} />
                    <AppStack.Screen name="CreateCollection" component={CreateCollection} />
                    <AppStack.Screen name="VerifyEmail" component={VerifyEmail} />
                    <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <AppStack.Screen name="ResetPasswordWithCode" component={ResetPasswordWithCode} />
                    <AppStack.Screen name="UserImage" component={UserImage} />
                </AppStack.Navigator>
            </NavigationContainer>

            <LoadingScreen />

            <Toast
                config={toastConfig}
                autoHide={true}
                visibilityTime={4000}
                position="bottom"
                bottomOffset={20}
            />
        </React.Fragment>
    );
}

export default AppNavigation;
