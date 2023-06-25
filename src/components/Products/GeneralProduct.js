import { ImageBackground, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import WishIcon from '../../assets/images/wish-icon.svg';
import WishIconLiked from '../../assets/images/wish-icon-liked.svg';
import MoreOption from '../../assets/images/more-option-icon.svg';
import MoreOptionVertical from '../../assets/images/more-option-v.svg';
import AppStyle from '../../assets/styles/AppStyle';
import AppConfig from '../../helpers/config';
import { useNavigation } from '@react-navigation/native';
import { ServiceGetWishListListingForUser, ServicePostProductToWishList } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';
import { SheetManager } from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import CheckBox from '@react-native-community/checkbox';

const GeneralProduct = (
  {
    item,
    index,
    flex = false,
    enable = false,
    optionIcon = false,
    handleOptions = null,
    handleToggle = null,
    selectedCollection = null,
    checkBox = false,
    checkBoxValue = false,
    handleCheckBox = null,
  }) => {
  const navigation = useNavigation();
  const loginConfig = useSelector(getLoginConfig);
  const [isEnabled, setIsEnabled] = useState(item?.status === 1);
  const [liked, setLiked] = useState(item?.is_liked || false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    handleToggle(isEnabled === 1 ? 0 : 1);
  };

  const flexStyle = flex ? { ...styles.flexImageContainer } :
    { ...styles.imageContainer, marginLeft: index === 0 ? 16 : 0 }


  const addToWishList = (wishListId) => {
    setLiked(true);
    ServicePostProductToWishList(wishListId, item?.id).then(response => {
      console.log({ response });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response?.data?.message
      });
    }).catch(e => {
      setLiked(false);
      showToastHandler(e);
    });
  }

  const getWishListListing = () => {
    if (!liked && loginConfig?.user?.role === 'u') {
      ServiceGetWishListListingForUser().then(response => {
        console.log({ response });
        const data = response?.data?.data;
        SheetManager.show('example-two', {
          payload: {
            header: 'Add to:',
            actions: data?.map(w => ({ title: w?.name, value: w?.id })),
            filterHandler: (wishListId) => addToWishList(wishListId)
          }
        });
      }).catch(e => {
        showToastHandler(e);
      });
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('ProductDetailScreen', { productId: item?.id })
      }}>
        <ImageBackground
          resizeMode='cover'
          source={{ uri: item?.image }}
          style={flexStyle}
          imageStyle={{ borderRadius: 8 }}
        >
          {!checkBox && !optionIcon &&
            <TouchableOpacity
              onPress={() => loginConfig?.isLogin ? getWishListListing() : navigation.navigate('Profile')}
              style={{ position: 'absolute', right: 0, top: 0 }}
            >
              {liked ? <WishIconLiked /> : <WishIcon />}
            </TouchableOpacity>}
          {optionIcon &&
            <TouchableOpacity onPress={handleOptions} style={{ position: 'absolute', right: 0, top: 0 }}>
              <MoreOption />
            </TouchableOpacity>}
          {checkBox && (
            <CheckBox
              value={checkBoxValue}
              onValueChange={handleCheckBox}
              boxType='square'
              onFillColor={AppStyle.colorSet.primaryColorA} // IOS
              onTintColor={AppStyle.colorSet.primaryColorA} // IOS
              onCheckColor={AppStyle.colorSet.primaryColorA} // IOS
              tintColors={{ true: AppStyle.colorSet.primaryColorA, false: AppStyle.colorSet.primaryColorA }} // Android
              style={{
                position: 'absolute', right: 0, top: 0,
                transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 0.8 }, { scaleY: 0.8 }]
              }}
            />
          )}
        </ImageBackground>
        <Text style={{ ...styles.name, width: flexStyle.width, marginLeft: index === 0 && !flex ? 16 : 0 }}>{item?.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.priceText, marginLeft: index === 0 && !flex ? 16 : 0 }}>
            ₹{item?.offer_price ? item?.offer_price : item?.price}
          </Text>
          {item?.price && item?.offer_price && <Text style={styles.secondPrice}>
            ₹{item.price}
          </Text>}
        </View>
      </TouchableOpacity>
      {enable && selectedCollection?.name === 'All' &&
        <View style={{ marginVertical: 0, height: 24, alignItems: 'flex-start', marginLeft: -10 }}>
          <Switch
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: Platform.OS === 'ios' ? .6 : .99 }, { scaleY: Platform.OS === 'ios' ? .6 : .99 }] }}
          />
        </View>}
    </View>
  )
}

export default GeneralProduct;

const styles = StyleSheet.create({
  imageContainer: {
    height: 136,
    width: 136,
    marginRight: 12,
    marginBottom: 2
  },
  flexImageContainer: {
    height: (AppConfig.windowWidth / 2) - 24,
    width: (AppConfig.windowWidth / 2) - 24,
  },
  name: {
    fontSize: 12,
    fontWeight: '400',
    color: AppStyle.colorSet.primaryColorA,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppStyle.colorSet.primaryColorA,
  },
  secondPrice: {
    color: AppStyle.colorSet.textSecondary,
    textDecorationLine: 'line-through',
    fontWeight: '300',
    textDecorationColor: AppStyle.colorSet.textSecondary,
    marginStart: 8,
    fontSize: 14,
  }
})