import React from 'react';
import AppStyle from '../assets/styles/AppStyle';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

const ProductCategories = () => {

    const items = [
        { name: 'Fashion', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Tea', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Toys', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Clothes', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Accessories', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Fashion', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Fashion', imageSource: require('../assets/images/demo-category-image.jpeg') },
        { name: 'Fashion', imageSource: require('../assets/images/demo-category-image.jpeg') },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <ImageBackground
                resizeMode='cover'
                source={item.imageSource}
                style={{ ...styles.imageContainer, marginLeft: index === 0 ? 16 : 0 }}
                imageStyle={{ borderRadius: 50 }}
            >
                <View style={styles.chipContainer}>
                    <Text numberOfLines={2} style={styles.chipText}>{item.name}</Text>
                </View>
            </ImageBackground>
        )
    }

    return (
        <View>
            <FlatList
                horizontal
                data={items}
                key={(index) => 'category' + index + 'chip'}
                renderItem={_renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default ProductCategories;

const styles = StyleSheet.create({
    container: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    imageContainer: {
        height: 70,
        width: 70,
        marginRight: 8,
    },
    chipContainer: {
        height: 70,
        width: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppStyle.colorSet.blackColor + '50'
    },
    chipText: {
        fontSize: 10,
        color: AppStyle.colorSet.whiteColor,
        letterSpacing: -0.5,
        fontWeight: '500',
        textAlign: 'center'
    }
})