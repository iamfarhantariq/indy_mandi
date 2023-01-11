import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../assets/styles/AppStyle';
import SustainableItem from './Products/SustainableItem';

const SustainableSection = () => {
    const items = [
        { name: 'Bambo Lamps', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Bambo Lamps', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Bambo Lamps', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Bambo Lamps', imageSource: require('../assets/images/demo-category-image.jpeg') },
    ];

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginLeft: index === 0 ? 16 : 0 }}>
                <SustainableItem item={item} index={index} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sustainable home decor</Text>

            <FlatList
                nestedScrollEnabled
                data={items}
                key={index => 'sustainable' + index + 'for-you'}
                renderItem={_renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

export default SustainableSection

const styles = StyleSheet.create({
    container: {
        marginBottom: '10%'
    },
    heading: {
        fontWeight: '600',
        fontSize: 16,
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8,
        marginLeft: 16
    }
})