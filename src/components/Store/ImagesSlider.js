import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppConfig from '../../helpers/config';
import Back from '../../assets/images/back-icon.svg';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const ImagesSlider = ({ images }) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlider] = useState(0);

  const _renderItem = ({ item, index }) => (
    <Image source={{ uri: item?.image }} resizeMode='cover' style={{ height: 300 }} />
  )

  return (
    <View>
      <View style={styles.imageSliderContainer}>
        <Carousel
          data={images}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveSlider(index)}
          sliderWidth={AppConfig.screenWidth}
          itemWidth={AppConfig.screenWidth}
          sliderHeight={300}
        />
        <TouchableOpacity onPress={() => navigation.pop()} style={styles.backButton}>
          <Back />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ImagesSlider;

const styles = StyleSheet.create({
  imageSliderContainer: {
    height: 300
  },
  backButton: {
    position: 'absolute',
    top: AppConfig.statusBarHeight + 20,
    left: 20
  }
})