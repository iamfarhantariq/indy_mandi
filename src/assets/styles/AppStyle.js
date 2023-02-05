import AppConfig from "../../helpers/config";

const _colorSet = {
  primaryColorA: '#1D2451',
  primaryColorB: '#713A74',
  primaryColorC: '#F4988A',
  BGColor: '#FBFBFB',
  borderLightGrayColor: '#EEEEEE',
  textSecondary: '#858585',
  textPlaceholderColor: '#B3B3B3',
  redColor: '#F03D3E',
  blackColor: '#000000',
  whiteColor: '#FFFFFF',
};

const _fontFamily = {
  Noto: {
    regular: {
      family: 'NotoSans-Regular',
    },
    bold: {
      family: 'NotoSans-Bold',
    },
  },
};

const _fontSet = {
  xxxlarge: 96,
  xxlarge: 28,
  xlarge: 24,
  large: 21,
  middle: 18,
  xnormal: 16,
  normal: 14,
  small: 12,
  msmall: 11,
  xsmall: 10,
};

const _fontLineHeight = {
  ten: 10,
  tweleve: 12,
  twenty: 20,
  twentyOne: 21,
  twentyFive: 25,
  seventeen: 17,
  eighteen: 18,
  sixteen: 16,
  twentyseven: 27,
  fourteen: 14,
};

const _iconSet = {
  // homeBackground: require('../images/app_background.png'),
};

const _bottom_container_button_style = {
  position: 'absolute',
  bottom: 0,
  height: 108,
  paddingTop: 16,
  width: AppConfig.windowWidth,
  paddingHorizontal: 16,
  borderTopColor: _colorSet.borderLightGrayColor,
  borderTopWidth: 1,
  backgroundColor: _colorSet.BGColor
}

const AppStyle = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  fontSet: _fontSet,
  fontLineHeight: _fontLineHeight,
  fontFamily: _fontFamily,
  buttonContainerBottom: _bottom_container_button_style
};

export default AppStyle;
