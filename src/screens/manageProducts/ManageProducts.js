import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import InputField from '../../components/Input/InputField'
import { commonStyle } from '../../helpers/common'
import GeneralProduct from '../../components/Products/GeneralProduct'
import InputFieldBase from '../../components/Input/InputFieldBase'

const ManageProducts = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('')

    const items = [
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
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
                <GeneralProduct item={item} index={index} flex={true} discountPrice={false} enable={true} options={true} />
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
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Manage products'} iconType='manageProducts' />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <View style={{ marginVertical: 18 }}>
                    <InputField value={search} onTextChange={(t) => setSearch(t)} filterIcon={true} />
                </View>

                <View style={{ marginVertical: 16 }}>
                    <FlatList
                        data={['All', 'On-sale', 'New year']}
                        horizontal
                        renderItem={ProductType}
                        key={index => 'type' + index + 'product'}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                        removeClippedSubviews={true}
                    />
                </View>

                <InputFieldBase
                    title={'Order of collection for customer'}
                    placeholder={'Order of collection for customer'}
                    value={sort}
                    onTextChange={(t) => setSort(t)}
                />

                <View style={{ flex: 1, marginBottom: 16 }}>
                    <FlatList
                        data={items}
                        nestedScrollEnabled
                        key={index => 'category' + index + 'main-product'}
                        renderItem={_renderItem}
                        horizontal={false}
                        removeClippedSubviews={true}
                        numColumns={2}
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        style={{ paddingVertical: 16 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default ManageProducts

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