import { Dimensions, Platform, StatusBar } from 'react-native';

const BASE_API_URL = 'BASE_URL'; // staging maybe
const GOOGLE_WEB_CLIENT_ID = 'GOOGLE_WEB_CLIENT';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const BOTTOM_TABS_HEIGHT = Platform.OS === 'ios' ? 100 : 82;

const PUSHER_APP_ID = 'PUSHER_APP_ID'
const PUSHER_APP_KEY = 'PUSHER_APP_KEY'
const PUSHER_APP_SECRET = 'PUSHER_APP_SECRET'
const PUSHER_APP_CLUSTER = 'PUSHER_APP_CLUSTER'

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
  googleWebClient: GOOGLE_WEB_CLIENT_ID
};

export default AppConfig;
