import { ImageBackground, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import WishIcon from '../../assets/images/wish-icon.svg';
import WishIconLiked from '../../assets/images/wish-icon-liked.svg';
import Option from '../../assets/images/options-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import AppConfig from '../../helpers/config';
import { useNavigation } from '@react-navigation/native';
import { ServiceGetWishListListingForUser, ServicePostProductToWishList } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';
import { SheetManager } from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';

const GeneralProduct = ({ item, index, flex = false, enable = false, optionIcon = false, handleOptions = null, handleToggle = null }) => {
  const navigation = useNavigation();
  const loginConfig = useSelector(getLoginConfig);
  const [isEnabled, setIsEnabled] = useState(item?.status);
  const [liked, setLiked] = useState(item?.is_liked || false);
  
  const toggleSwitch = () => {
    setIsEnabled(isEnabled === 1 ? 0 : 1);
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
    if (!liked) {
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
          {loginConfig?.isLogin && (optionIcon ?
            <TouchableOpacity onPress={handleOptions} style={{ position: 'absolute', right: 0, top: 0 }}>
              <WishIconLiked />
            </TouchableOpacity> :
            <TouchableOpacity onPress={getWishListListing} style={{ position: 'absolute', right: 0, top: 0 }}>
              {liked ? <WishIconLiked /> : <WishIcon />}
            </TouchableOpacity>)}
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
      {enable &&
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