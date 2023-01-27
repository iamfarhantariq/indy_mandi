import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../Input/InputField';
import { useState } from 'react';
import { commonStyle } from '../../helpers/common';
import GeneralProduct from '../Products/GeneralProduct';

const ProductSectionStore = () => {
    const [search, setSearch] = useState('');

    const items = [
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    const ProductType = ({ item, index }) => (
        <View style={{ marginRight: 16 }}>
            <Image resizeMode='cover' style={styles.imageStyle}
                source={require('../../assets/images/demo-cover-bg.png')} />
            <Text style={styles.typeText}>{item}</Text>
        </View>
    )

    return (
        <View style={{ marginVertical: 16 }}>
            <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            <FlatList
                data={['All', 'On-sale', 'New year']}
                horizontal
                renderItem={ProductType}
                key={index => 'type' + index + 'product'}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 16 }}
                nestedScrollEnabled
            />
            <View style={{height: 'auto'}}>
                <FlatList
                    data={items}
                    nestedScrollEnabled
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
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
    },
    typeText: {
        ...commonStyle('400', 12, 'primaryColorA'),
        lineHeight: 16.34,
        marginTop: 4
    }
})