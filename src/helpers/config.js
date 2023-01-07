import { Dimensions, Platform, StatusBar } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// const insets = useSafeAreaInsets();
// const statusBarHeight = insets.top;
// const BASE_API_URL = 'https://develop-geniustravel.cherimoya.be/v1';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const BOTTOM_TABS_HEIGHT = Platform.OS === 'ios' ? 100 : 82;

const _EMAIL_REG_EXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const AppConfig = {
  // baseApiURL: BASE_API_URL,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  windowWidth: WINDOW_WIDTH,
  windowHeight: WINDOW_HEIGHT,
  statusBarHeight: STATUS_BAR_HEIGHT,
  bottomTabsHeight: BOTTOM_TABS_HEIGHT,
};

export default AppConfig;
