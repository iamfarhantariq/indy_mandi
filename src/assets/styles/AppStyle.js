const _colorSet = {
  primaryColor: '#091E30',
  secondaryColor: '#05CE78',
  grayColor: '#596C7F',
  blackColor: '#000000',
  greenColorOne: '#1FE79656',
  whiteColor: '#FFFFFF',
};

const _fontFamily = {
  popins: {
    regular: {
      family: 'Poppins-Regular',
    },
    semiBold: {
      family: 'Poppins-SemiBold',
    },
    medium: {
      family: 'Poppins-Medium',
    },
    bold: {
      family: 'Poppins-Bold',
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
  homeBackground: require('../images/app_background.png'),
};

const AppStyle = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  fontSet: _fontSet,
  fontLineHeight : _fontLineHeight,
  fontFamily: _fontFamily,
};

export default AppStyle;
