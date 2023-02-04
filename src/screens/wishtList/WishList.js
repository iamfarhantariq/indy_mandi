import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import AppConfig from '../../helpers/config';
import { useNavigation } from '@react-navigation/native';

const WishList = () => {
  const navigation = useNavigation();

  const items = [
    { name: 'Shoes', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'Winter stuff', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'Beverages', imageSource: require('../../assets/images/demo-category-image.jpeg') },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('WishListDetail')}
        style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
        <Image
          resizeMode='cover'
          source={item.imageSource}
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
          data={items}
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