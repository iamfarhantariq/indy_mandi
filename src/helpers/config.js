import { Dimensions, Platform, StatusBar } from 'react-native';

// const BASE_API_URL = 'https://indymandi.com/api'; // Dev maybe
const BASE_API_URL = 'https://staging.indymandi.com/api'; // staging maybe

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const BOTTOM_TABS_HEIGHT = Platform.OS === 'ios' ? 100 : 82;

const _EMAIL_REG_EXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const PUSHER_APP_ID = 859996
const PUSHER_APP_KEY = '09dc0a50ffe300c08cb8'
const PUSHER_APP_SECRET = '6e4cb89e9e6159ef779d'
const PUSHER_APP_CLUSTER = 'ap2'

const AppConfig = {
  baseApiURL: BASE_API_URL,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  windowWidth: WINDOW_WIDTH,
  windowHeight: WINDOW_HEIGHT,
  statusBarHeight: STATUS_BAR_HEIGHT,
  bottomTabsHeight: BOTTOM_TABS_HEIGHT,
  pusherAppId: PUSHER_APP_ID,
  pusherAppKey: PUSHER_APP_KEY,
  pusherAppSecret: PUSHER_APP_SECRET,
  pusherAppCluster: PUSHER_APP_CLUSTER,
};

export default AppConfig;
