import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppConfig from '../../helpers/config';
import Back from '../../assets/images/back-icon.svg';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import AppStyle from '../../assets/styles/AppStyle';

const ImagesSlider = ({ images, setVideoLink }) => {
  console.log({ images });
  const navigation = useNavigation();
  const [activeSlide, setActiveSlider] = useState(0);

  const _renderItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      {item?.includes('.mp4') ?
        <TouchableOpacity style={styles.videoContainer} onPress={() => {
          setVideoLink(item)
        }}>
          <Image source={require('../../assets/images/play_button.png')} resizeMode='cover' style={{ height: 70, width: 70 }} />
        </TouchableOpacity>
        :
        <Image source={{ uri: item }} resizeMode='cover' style={{ height: 300 }} />}
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
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
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppStyle.colorSet.textPlaceholderColor
  },
  backButton: {
    position: 'absolute',
    top: AppConfig.statusBarHeight + 20,
    left: 20
  }
})