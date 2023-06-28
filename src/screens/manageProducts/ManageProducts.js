import { ActivityIndicator, FlatList, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SheetManager } from 'react-native-actions-sheet';
import { ServiceDeleteProduct, ServiceDeleteProductFromCollection, ServiceDuplicateProduct, ServicePostProductToCollection } from '../../services/AppService'
import Button from '../../components/Button';
import Cross from '../../assets/images/cross-icon.svg';
import Add from '../../assets/images/add-icon.svg';
import AppConfig from '../../helpers/config'

const ManageProducts = ({ route }) => {
    const { storeId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const [search, setSearch] = useState('');
    const [collectionOrder, setCollectionOrder] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [products, setProducts] = useState([]);
    const [openCollectionModal, setOpenCollectionModal] = useState({ open: false, data: null });

    useEffect(() => {
        if (storeId) {
            getStoreCollection();
        } else {
            navigation.pop();
        }
    }, [isFocus]);

    useEffect(() => {
        console.log({ selectedCollection });
        if (selectedCollection) {
            getCollectionProducts();
        }
    }, [page, search, selectedCollection]);

    useEffect(() => {
        setPage(1);
    }, [selectedCollection, search, collectionOrder]);

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
                } else {
                    setSelectedCollection({...selectedCollection});
                }
            }).catch(e => {
                showToastHandler(e);
            });
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const getCollectionProducts = (newSearch = false) => {
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
        console.log({payload});
        ServiceUpdateProductStatus(payload).then(response => {
            console.log({ response });
            const _products = [...products];
            const index = _products.findIndex(f => f?.id === productId);
            _products[index].status = status;
            setProducts[_products];
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Success',
            });
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const onProductOptionClick = (product) => {
        SheetManager.show('example-two', {
            payload: {
                header: 'Choose your action',
                actions: selectedCollection?.name !== 'All' ? [
                    { title: 'Copy to other collection', value: 'copy' },
                    { title: 'Move to other collection', value: 'move' },
                    { title: 'Remove from this collection', value: 'remove' }
                ] : [
                    { title: 'Edit product', value: 'edit' },
                    { title: 'Duplicate product', value: 'duplicate' },
                    { title: 'Delete product', value: 'delete' },
                ],
                filterHandler: (_action) => filterHandler(_action)
            }
        });

        const filterHandler = (action) => {
            SheetManager.hide('example-two');
            if (action === 'edit') {
                navigation.navigate('AddProduct', { product })
            } else if (action === 'duplicate') {
                dispatch(setActivityIndicator(true));
                ServiceDuplicateProduct(product?.id).then(response => {
                    console.log({ response });
                    getCollectionProducts(true);
                    dispatch(setActivityIndicator(false));
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            } else if (action === 'delete') {
                dispatch(setActivityIndicator(true));
                ServiceDeleteProduct(product?.id).then(response => {
                    console.log({ response });
                    getCollectionProducts(true);
                    dispatch(setActivityIndicator(false));
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Success',
                    });
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            } else if (action === 'copy' || action === 'move') {
                setTimeout(() => {
                    setOpenCollectionModal({ open: true, data: { action, productId: product?.id } });
                }, Platform.OS === "ios" ? 200 : 0);
            } else if (action === 'remove') {
                dispatch(setActivityIndicator(true));
                ServiceDeleteProductFromCollection(selectedCollection?.id, product?.id).then(response => {
                    console.log({ response });
                    getCollectionProducts(true);
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: response?.data?.message
                    });
                    dispatch(setActivityIndicator(false));
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            }
        }
    }

    const handleMoveCopyAction = (newCollectionId) => {
        dispatch(setActivityIndicator(true));
        ServicePostProductToCollection(
            newCollectionId, // target collection
            openCollectionModal?.data?.productId, // action product
            openCollectionModal?.data?.action?.toLowerCase(), // action
            selectedCollection?.id, // current collection id
        ).then(response => {
            console.log({ response });
            getCollectionProducts(true);
            setOpenCollectionModal({ open: false, data: null });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.data?.message
            });
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct
                    item={item} index={index} flex={true}
                    optionIcon={true}
                    handleOptions={() => onProductOptionClick(item)}
                    enable={true} selectedCollection={selectedCollection}
                    handleToggle={(value) => updateProductStatus(value, item?.id)}
                />
            </View>
        )
    }

    const ProductType = ({ item, index }) => {
        const selectedStyle = { borderColor: AppStyle.colorSet.primaryColorB, borderWidth: 2 };
        return (
            <TouchableOpacity onPress={() => {
                setSelectedCollection(item);
            }} style={{ marginRight: 16, flexWrap: 'wrap' }}>
                <Image resizeMode='cover' style={item?.id === selectedCollection?.id ? { ...selectedStyle, ...styles.imageStyle } : styles.imageStyle}
                    source={{ uri: item?.image }} />
                <Text style={styles.typeText}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }

    const __renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => handleMoveCopyAction(item?.id)}
                style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
                <Image
                    resizeMode='cover'
                    source={{ uri: item?.image }}
                    style={styles.flexImageContainer}
                    imageStyle={{ borderRadius: 8 }}
                />
                <Text style={styles.typeText}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack
                title={'Manage products'}
                iconType='manageProducts'
                handleManageCollection={() => {
                    navigation.navigate('ManageCollection', { storeId });
                }}
                addButtonClicked={() => navigation.navigate('AddProduct', { product: null })}
            />
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

                <View style={{ flex: 1, marginBottom: selectedCollection?.name !== 'All' ? 108 : 16 }}>
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
            {selectedCollection?.name !== 'All' &&
                <View style={AppStyle.buttonContainerBottom}>
                    <Button text={'Add products on this collection'} handleClick={() => navigation.navigate('ProductsToCollection', { collectionId: selectedCollection?.id })} />
                </View>
            }
            {openCollectionModal?.open &&
                <View style={{}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openCollectionModal?.open}
                        onRequestClose={() => setOpenCollectionModal({ open: false, data: null })}
                        style={{ width: '90%', height: '50%' }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.title}>Select a collection</Text>
                                    <TouchableOpacity onPress={() => setOpenCollectionModal({ open: false, data: null })}>
                                        <Cross />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 16 }}>
                                    <FlatList
                                        horizontal={false}
                                        data={collections.filter(f => f?.name !== 'All')}
                                        numColumns={2}
                                        key={(index) => 'collection' + index + 'product'}
                                        renderItem={__renderItem}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>}
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        width: AppConfig.windowWidth / 1.08,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        ...commonStyle('500', 20, 'primaryColorA'),
    },
    flexImageContainer: {
        height: ((AppConfig.windowWidth / 1.08) / 2) - 24,
        width: ((AppConfig.windowWidth / 1.08) / 2) - 24,
        borderRadius: 8
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
})