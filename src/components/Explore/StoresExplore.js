import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExploreHeading from './ExploreHeading'
import { commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'

const StoresExplore = () => {
    const items = [
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Feine Coffee Company', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ]

    const _renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Image resizeMode='cover' source={item.imageSource}
                style={styles.imageStyle} />
            <Text style={styles.text}>{item.name}</Text>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Stores'} isFilter={false} />

            <FlatList
                data={items}
                key={index => 'category' + index + 'store'}
                renderItem={_renderItem}
                horizontal={false}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

export default StoresExplore

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 8
    },
    text: {
        ...commonStyle('400', 16, 'primaryColorA'),
        marginLeft: 12
    }
})