import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import GeneralProduct from '../../components/Products/GeneralProduct';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { ServiceGetWishListProducts } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';

const WishListDetail = ({ route }) => {
    const { wishListId } = route?.params;
    console.log({ wishListId });
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsForThisWishList();
    }, [search]);

    const getProductsForThisWishList = () => {
        ServiceGetWishListProducts(wishListId, search).then(response => {
            console.log({ response });
            setProducts(response?.data);
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const items = [
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ];

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Shoes'} iconType='options' />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <FlatList
                    horizontal={false}
                    data={items}
                    numColumns={2}
                    key={(index) => 'wishlist' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default WishListDetail

const styles = StyleSheet.create({})