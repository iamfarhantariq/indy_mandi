import { Dimensions } from 'react-native';

// const BASE_API_URL = 'https://develop-geniustravel.cherimoya.be/v1';

const MIN_PRICE = 0;
const MAX_PRICE = 2500;

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const _EMAIL_REG_EXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const AppConfig = {
  baseApiURL: BASE_API_URL,
};

export default AppConfig;
