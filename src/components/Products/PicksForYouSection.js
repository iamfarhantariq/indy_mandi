import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import PickForYouItem from './PickForYouItem';

const PicksForYouSection = () => {

  const items = [
    { name: 'Juicy Chemistry', description: 'Explore Juicy Chemistrys range of organic and natural skin and silky', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'Juicy Chemistry', description: 'Explore Juicy Chemistrys range of organic and natural skin and silky', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'Juicy Chemistry', description: 'Explore Juicy Chemistrys range of organic and natural skin and silky', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'Juicy Chemistry', description: 'Explore Juicy Chemistrys range of organic and natural skin and silky', imageSource: require('../../assets/images/demo-category-image.jpeg') },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginLeft: index === 0 ? 16 : 0 }}>
        <PickForYouItem item={item} index={index} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Picks for you</Text>

      <FlatList
        nestedScrollEnabled
        data={items}
        removeClippedSubviews={true}
        key={index => 'picks' + index + 'for-you'}
        renderItem={_renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

    </View>
  )
}

export default PicksForYouSection

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.colorSet.primaryColorA,
    paddingVertical: 16,
    marginBottom: 16
  },
  heading: {
    fontWeight: '600',
    fontSize: 16,
    color: AppStyle.colorSet.primaryColorC,
    marginBottom: 8,
    marginLeft: 16
  }
})