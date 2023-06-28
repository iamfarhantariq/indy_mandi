import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import AppConfig from '../../helpers/config';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceGetUserWishList } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';

const WishList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    isFocus && getUserWishLists();
  }, [isFocus]);

  const getUserWishLists = () => {
    dispatch(setActivityIndicator(true));
    ServiceGetUserWishList().then((response) => {
      console.log({ response });
      setWishList(response?.data?.data);
      dispatch(setActivityIndicator(false));
    }).catch(e => {
      showToastHandler(e, dispatch);
    });
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('WishListDetail', { wishListId: item?.id, wishListName: item?.name, wishlists: wishlist, share_link: item?.share_link })}
        style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
        <Image
          resizeMode='cover'
          source={{ uri: item?.image }}
          style={styles.flexImageContainer}
          imageStyle={{ borderRadius: 8 }}
        />
        <Text style={styles.name}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HeaderWithBack title={'Wish lists ❤️'} iconType='add' route='CreateWishList' />
      <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
        <FlatList
          horizontal={false}
          data={wishlist}
          numColumns={2}
          key={(index) => 'wishlist' + index + 'product'}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default WishList

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
    borderRadius: 8
  },
  name: {
    fontSize: 12,
    fontWeight: '400',
    color: AppStyle.colorSet.primaryColorA,
    marginTop: 2,
  }
})