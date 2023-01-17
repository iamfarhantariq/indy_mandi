import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppConfig from '../../helpers/config';
import Back from '../../assets/images/back-icon.svg';
import Carousel from 'react-native-snap-carousel';

const ImagesSlider = () => {
  const [activeSlide, setActiveSlider] = useState(0);
  const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ]

  const _renderItem = ({ item, index }) => (
    <Image source={item} resizeMode='cover' />
  )

  const Pagination = () => {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }


  return (
    <View>
      <View style={styles.imageSliderContainer}>
        <Carousel
          data={images}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveSlider(index)}
        />
        <Pagination />
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Back />
        </TouchableOpacity>
      </View>

      <Text>ImagesSlider</Text>
    </View>
  )
}

export default ImagesSlider

const styles = StyleSheet.create({
  imageSliderContainer: {
    marginTop: AppConfig.statusBarHeight,
  }
})