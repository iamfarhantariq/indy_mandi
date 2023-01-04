import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WishIcon from '../../assets/images/wish-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';

const GeneralProduct = ({ item, index }) => {
  return (
    <View>
      <ImageBackground
        resizeMode='cover'
        source={item.imageSource}
        style={{ ...styles.imageContainer, marginLeft: index === 0 ? 16 : 0 }}
        imageStyle={{ borderRadius: 8 }}
      >
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }}>
          <WishIcon />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={{ ...styles.name, marginLeft: index === 0 ? 16 : 0 }}>{item?.name}</Text>
      <View style={{ flexDirection: 'row'}}>
        <Text style={{ ...styles.priceText, marginLeft: index === 0 ? 16 : 0 }}>
          {item?.price}
        </Text>
        <Text style={styles.secondPrice}>
          $98.99
        </Text>
      </View>
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