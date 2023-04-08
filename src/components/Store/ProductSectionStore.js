import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common';
import GeneralProduct from '../Products/GeneralProduct';
import AppStyle from '../../assets/styles/AppStyle';

const ProductSectionStore = ({ collections, selectedCollection, products }) => {
    console.log({ collections });
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    const ProductType = ({ item, index }) => {
        const selectedStyle = { borderColor: AppStyle.colorSet.primaryColorB, borderWidth: 1 };
        return (
            <View style={{ marginRight: 16 }}>
                <Image resizeMode='cover' style={item === selectedCollection ? { ...selectedStyle, ...styles.imageStyle } : styles.imageStyle}
                    source={{ uri: item?.image }} />
                <Text style={styles.typeText}>{item?.name}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 16 }}>
            <View style={{ marginVertical: 16 }}>
                <FlatList
                    data={collections}
                    horizontal
                    removeClippedSubviews={true}
                    renderItem={ProductType}
                    key={index => 'type' + index + 'product'}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                />
            </View>
            <View style={{ flex: 1, marginBottom: 16 }}>
                <FlatList
                    data={products}
                    nestedScrollEnabled
                    removeClippedSubviews={true}
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 16 }}
                />
            </View>
        </View>
    )
}

export default ProductSectionStore;

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 8,
        height: 80,
        width: 80,
        // borderColor: AppStyle.colorSet.primaryColorB,
        // borderWidth: 2,
    },
    typeText: {
        ...commonStyle('400', 12, 'primaryColorA'),
        lineHeight: 16.34,
        marginTop: 4
    }
})