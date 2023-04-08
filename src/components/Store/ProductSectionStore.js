import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common';
import GeneralProduct from '../Products/GeneralProduct';
import AppStyle from '../../assets/styles/AppStyle';
import { useState } from 'react';
import { useEffect } from 'react';
import { ServiceGetStoreProducts } from '../../services/ProductService';

const ProductSectionStore = ({ collections, selectedCollection, products, setSelectedCollection, storeId, search }) => {
    console.log({ collections });
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [productsForCollection, setProductsForCollection] = useState(products);

    useEffect(() => {
        if (page > 1) {
            getProducts();
        }
    }, [page]);

    const getProducts = () => {
        setLoading(true);
        const payload = { store_id: storeId, search_keywords: search, collection_id: selectedCollection?.id };
        console.log({ payload });
        ServiceGetStoreProducts(payload).then(response => {
            console.log({ response });
            if (page > 1) {
                setProductsForCollection([...productsForCollection, ...response?.data]);
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    const ProductType = ({ item, index }) => {
        const selectedStyle = { borderColor: AppStyle.colorSet.primaryColorB, borderWidth: 2 };
        return (
            <TouchableOpacity onPress={() => setSelectedCollection(item)} style={{ marginRight: 16, flexWrap: 'wrap' }}>
                <Image resizeMode='cover' style={item === selectedCollection ? { ...selectedStyle, ...styles.imageStyle } : styles.imageStyle}
                    source={{ uri: item?.image }} />
                <Text style={styles.typeText}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 16 }}>
            <View style={{ marginVertical: 16 }}>
                <FlatList
                    data={collections}
                    horizontal
                    renderItem={ProductType}
                    key={index => 'type' + index + 'product'}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                />
            </View>
            <View style={{ flex: 1, marginBottom: 16 }}>
                <FlatList
                    data={productsForCollection}
                    nestedScrollEnabled
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 16 }}
                    onEndReached={info => {
                        if (page > lastPage) return;
                        setPage(page + 1);
                    }}
                />
                {loading &&
                    <View style={{ marginBottom: 20 }}>
                        <ActivityIndicator size={'large'} />
                    </View>
                }
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
        marginTop: 4,
        width: 88,
    }
})