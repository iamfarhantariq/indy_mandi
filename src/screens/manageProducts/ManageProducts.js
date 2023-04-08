import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import InputField from '../../components/Input/InputField'
import { commonStyle, showToastHandler } from '../../helpers/common'
import GeneralProduct from '../../components/Products/GeneralProduct'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { ServiceGetCollectionProductsSorted, ServiceGetStoreFirstCollection, ServiceGetStoreOtherCollection, ServiceGetStoreProducts, ServiceUpdateProductStatus } from '../../services/ProductService'
import { useEffect } from 'react'
import CollectionOrder from '../../components/Store/CollectionOrder'
import { useDispatch } from 'react-redux'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { useNavigation } from '@react-navigation/native'

const ManageProducts = ({ route }) => {
    const { storeId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [collectionOrder, setCollectionOrder] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (storeId) {
            getStoreCollection();
        } else {
            navigation.pop();
        }
    }, []);

    useEffect(() => {
        if (selectedCollection) {
            getCollectionProducts();
        }
    }, [selectedCollection, search, page]);

    useEffect(() => {
        setPage(1);
    }, [search, collectionOrder]);

    useEffect(() => {
        if (collectionOrder) {
            const payload = { products_order: collectionOrder };
            if (selectedCollection?.name !== 'All') {
                payload.collection_id = selectedCollection?.id;
            }
            sortCollectionOrder(payload);
        }
    }, [collectionOrder]);


    const getStoreCollection = () => {
        ServiceGetStoreFirstCollection(storeId).then(response => {
            ServiceGetStoreOtherCollection(storeId).then(_response => {
                const combinedCollection = [response?.data, ..._response?.data];
                setCollections(combinedCollection);
                if (!selectedCollection) {
                    setSelectedCollection(combinedCollection[0]);
                }
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const getCollectionProducts = () => {
        setLoading(true);
        const payload = { store_id: storeId, search_keywords: search };
        if (selectedCollection && selectedCollection?.id) {
            payload.collection_id = selectedCollection?.id;
        }
        console.log({ payload });
        ServiceGetStoreProducts(payload, page).then(response => {
            console.log({ response });
            if (page === 1) {
                setProducts(response?.data);
            } else {
                setProducts([...products, ...response?.data])
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        })
    }

    const sortCollectionOrder = (payload) => {
        dispatch(setActivityIndicator(true));
        ServiceGetCollectionProductsSorted(payload).then(response => {
            setPage(1);
            setProducts(response?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const updateProductStatus = (status, productId) => {
        const payload = { productid: productId, status };
        ServiceUpdateProductStatus(payload).then(response => {
            console.log({ response });
            const _products = [...products];
            const index = _products.findIndex(f => f?.id === productId);
            _products[index].status = status;
            setProducts[_products];
        }).catch(e => {
            showToastHandler(e);
        });

    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} discountPrice={false} enable={true} options={true} handleToggle={(value) => updateProductStatus(value, item?.id)} />
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
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Manage products'} iconType='manageProducts' handleManageCollection={() => {
                navigation.navigate('ManageCollection', { storeId });
            }} />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <View style={{ marginVertical: 18 }}>
                    <InputField value={search} onTextChange={(t) => setSearch(t)} />
                </View>

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

                <CollectionOrder handleChange={(value) => setCollectionOrder(value)} collectionOrder={collectionOrder} />

                <View style={{ flex: 1, marginBottom: 16 }}>
                    <FlatList
                        data={products}
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
        marginTop: 4,
        width: 88,
    }
})