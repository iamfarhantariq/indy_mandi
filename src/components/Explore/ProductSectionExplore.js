import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExploreHeading from './ExploreHeading'
import GeneralProduct from '../Products/GeneralProduct'

const ProductSectionExplore = ({ items }) => {
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Products'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    nestedScrollEnabled
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ProductSectionExplore

const styles = StyleSheet.create({})