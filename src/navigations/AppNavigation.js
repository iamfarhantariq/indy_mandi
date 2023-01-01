import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Favorite from '../screens/favorite/Favorite';
import Login from '../screens/login/Login';
import {StatusBar, useColorScheme, ImageBackground} from 'react-native';
import StyleApp from '../assets/styles/AppStyle';
import BookTrip from '../screens/bookTrip/BookTrip';
import Travelers from '../screens/travelers/Travelers';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import Register from '../screens/register/Register';
import ChooseRoom from '../screens/chooseRoom/ChooseRoom';
import Images from '../screens/imagesScreen/Images';
import YourFlight from '../screens/yourFlight/YourFlight';
import Map from '../screens/map/Map';
import BookingDetail from '../screens/bookingDetail/BookingDetail';
import Filters from '../screens/filters/Filters';
import Currencies from '../screens/currencies/Currencies';
import ForgotPassword from '../screens/forgot_password/ForgotPassword';
import TravelPackage from '../screens/findTravelPackage/TravelPackage';
import AirportDeparture from '../screens/airportDeparture/AirportDeparture';
import Airports from '../screens/airports/Airport';
import ProfileMain from '../screens/profile_main/ProfileMain';
import LoginMethodsScreen from '../screens/login_methods/LoginMethods';
import ShareTrip from '../screens/shareTrip/ShareTrip';
import Settings from '../screens/settingScreen/Settings';
import LanguagesScreen from '../screens/languages/Languages';
import FeedbackScreen from '../screens/feedback/Feedback';
import ChangePassword from '../screens/change_password/ChangePassword';
import ChangeName from '../screens/change_name/ChangeName';
import DeleteAccount from '../screens/delete_account/DeleteAccount';
import GenericConfirmation from '../screens/genericConfirmation/GenericConfirmation';
import NavigationTabs from '../screens/navigationTabs/NavigationTabs';
import SelectAirport from '../screens/select_airport/SelectAirport';
import FaqScreen from '../screens/faq/Faq';
import PersonalInfo from '../screens/personalInfo/PersonalInfo';
import TabHomeActive from '../assets/images/tab_home_icon_active.svg';
import TabHomeInActive from '../assets/images/tab_home_icon_inactive.svg';
import TabHeartActive from '../assets/images/tab_heart_icon_active.svg';
import TabHeartInActive from '../assets/images/tab_heart_icon_inactive.svg';
import TabProfileActive from '../assets/images/tab_profile_icon_active.svg';
import TabProfileInActive from '../assets/images/tab_profile_icon_inactive.svg';
import AirlineClass from '../screens/airlineClass/AirlineClass';
import HomeSearch from '../screens/homeSearch/HomeSearch';
import Countries from '../screens/countries/Countries';
import Toast, {BaseToast} from 'react-native-toast-message';
import DepartureTime from '../screens/departure/DepartureTime';
import PinScreen from '../screens/pinScreen/PinScreen';
import {useSelector} from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';
import {BackHandler} from 'react-native';
import {useDispatch} from 'react-redux';
import {setActivityIndicator} from '../features/appconfig/appconfigSlice';
import SearchAirports from '../screens/searchAirports/SearchAirports';
import HotelFilters from '../screens/hotelFilters/HotelFilters';
import SplashScreen from 'react-native-splash-screen';

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
                    // height: '7%',
                    borderTopWidth: 0,
                    backgroundColor: '#091E30',
                    padding: 10,
                },
                title: '',
                tabBarActiveTintColor: StyleApp.colorSet.secondaryColor,
                headerShown: false,
                tabBarBackground: props => {
                    return (
                        <ImageBackground
                            resizeMode="cover"
                            style={{flex: 1}}
                            source={require('../assets/images/background.png')}></ImageBackground>
                    );
                },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        focused ? (
                            <TabHomeActive
                                source={StyleApp.iconSet.crossGray}></TabHomeActive>
                        ) : (
                            <TabHomeInActive
                                source={StyleApp.iconSet.crossGray}></TabHomeInActive>
                        ),
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteStackScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        focused ? (
                            <TabHeartActive
                                source={StyleApp.iconSet.crossGray}></TabHeartActive>
                        ) : (
                            <TabHeartInActive
                                source={StyleApp.iconSet.crossGray}></TabHeartInActive>
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) =>
                        focused ? (
                            <TabProfileActive
                                source={StyleApp.iconSet.crossGray}></TabProfileActive>
                        ) : (
                            <TabProfileInActive
                                source={StyleApp.iconSet.crossGray}></TabProfileInActive>
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen({navigation, route}) {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HomeScreen" component={Home}/>
        </HomeStack.Navigator>
    );
}

const FavoriteStack = createNativeStackNavigator();

function FavoriteStackScreen() {
    return (
        <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
            <FavoriteStack.Screen name="FavoriteScreen" component={Favorite}/>
            <FavoriteStack.Screen name="ShareTrip" component={ShareTrip}/>
        </FavoriteStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}}>
            <ProfileStack.Screen name="ProfileMainScreen" component={ProfileMain}/>
        </ProfileStack.Navigator>
    );
}

const AppStack = createNativeStackNavigator();

function AppNavigation() {
    const isDarkMode = useColorScheme() === 'dark';
    const appconfig = useSelector(state => state.appconfig);

    const CustomToast = (props) => {
        return <BaseToast
            {...props}
            text2NumberOfLines={2}
            style={{borderLeftColor: props.type === 'error' ? 'red' : 'gray'}}
            text1Style={{fontSize: StyleApp.fontSet.normal, fontFamily: StyleApp.fontFamily.popins.bold.family}}
            text2Style={{fontSize: StyleApp.fontSet.small, fontFamily: StyleApp.fontFamily.popins.regular.family}}
        />
    }

    const toastConfig = {
        info: (props) => (
            <CustomToast {...props}/>
        ),
        error: (props) => (
            <CustomToast {...props}/>
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
                barStyle={'light-content'}
            />
            <NavigationContainer>
                <AppStack.Navigator screenOptions={{headerShown: false}}>
                    <AppStack.Screen
                        initialRouteName="Home"
                        name="AppTabs"
                        component={!appconfig.pinCheck.isChecked ? PinScreen : AppTabs}
                    />
                    <AppStack.Screen tab name="BookTrip" component={BookTrip}/>
                    <AppStack.Screen name="ChooseRoom" component={ChooseRoom}/>
                    <AppStack.Screen name="ImagesScreen" component={Images}/>
                    <AppStack.Screen name="YourFlight" component={YourFlight}/>
                    <AppStack.Screen name="Map" component={Map}/>
                    <AppStack.Screen name="BookingDetail" component={BookingDetail}/>
                    <AppStack.Screen name="Filters" component={Filters}/>
                    <AppStack.Screen name="HomeSearch" component={HomeSearch}/>
                    <AppStack.Screen name="Countries" component={Countries}/>
                    <AppStack.Screen name="TravelPackage" component={TravelPackage}/>
                    <AppStack.Screen
                        name="AirportDeparture"
                        component={AirportDeparture}
                    />
                    <AppStack.Screen name="NavigationTabs" component={NavigationTabs}/>
                    <AppStack.Screen name="CalendarScreen" component={CalendarScreen}/>
                    <AppStack.Screen name="DepartureTime" component={DepartureTime}/>
                    <AppStack.Screen name="TravelersScreen" component={Travelers}/>
                    <AppStack.Screen name="ShareTrip" component={ShareTrip}/>
                    <AppStack.Screen name="AirlineClass" component={AirlineClass}/>
                    <AppStack.Screen
                        name="LoginMethodsScreen"
                        component={LoginMethodsScreen}
                    />
                    <AppStack.Screen name="ProfileScreen" component={Login}/>
                    <AppStack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPassword}
                    />
                    <AppStack.Screen name="RegisterScreen" component={Register}/>
                    <AppStack.Screen name="Airports" component={Airports}/>
                    <AppStack.Screen name="CurrenciesScreen" component={Currencies}/>
                    <AppStack.Screen name="Settings" component={Settings}/>
                    <AppStack.Screen name="LanguagesScreen" component={LanguagesScreen}/>
                    <AppStack.Screen name="FeedbackScreen" component={FeedbackScreen}/>
                    <AppStack.Screen name="ChangePassword" component={ChangePassword}/>
                    <AppStack.Screen name="ChangeName" component={ChangeName}/>
                    <AppStack.Screen
                        name="DeleteAccountScreen"
                        component={DeleteAccount}
                    />
                    <AppStack.Screen
                        name="GenericConfirmation"
                        component={GenericConfirmation}
                    />
                    <AppStack.Screen
                        name="SelectAirportScreen" sometimes
                        component={SelectAirport}
                    />
                    <AppStack.Screen name="FaqScreen" component={FaqScreen}/>
                    <AppStack.Screen name="PersonalInfoScreen" component={PersonalInfo}/>
                    <AppStack.Screen name="SearchAirports" component={SearchAirports}/>
                    <AppStack.Screen name="HotelFilters" component={HotelFilters}/>
                </AppStack.Navigator>
            </NavigationContainer>

            <LoadingScreen/>

            <Toast
                config={toastConfig}
                autoHide={true}
                visibilityTime={6000}
                position="bottom"
                bottomOffset={20}

            />
        </React.Fragment>
    );
}

export default AppNavigation;
