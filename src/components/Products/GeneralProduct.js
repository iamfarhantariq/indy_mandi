import { ImageBackground, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import WishIcon from '../../assets/images/wish-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import AppConfig from '../../helpers/config';
import { useNavigation } from '@react-navigation/native';

const GeneralProduct = ({ item, index, flex = false, options = false, discountPrice = true, enable = false, enableHandler = null }) => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const flexStyle = flex ? { ...styles.flexImageContainer } :
    { ...styles.imageContainer, marginLeft: index === 0 ? 16 : 0 }

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen')}>
        <ImageBackground
          resizeMode='cover'
          source={item.imageSource}
          style={flexStyle}
          imageStyle={{ borderRadius: 8 }}
        >
          <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }}>
            <WishIcon />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={{ ...styles.name, marginLeft: index === 0 && !flex ? 16 : 0 }}>{item?.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.priceText, marginLeft: index === 0 && !flex ? 16 : 0 }}>
            {item?.price}
          </Text>
          {discountPrice && <Text style={styles.secondPrice}>
            $98.99
          </Text>}
        </View>
      </TouchableOpacity>
      {enable &&
        <View style={{ marginVertical: 0, height:  24, alignItems: 'flex-start', marginLeft: -10}}>
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