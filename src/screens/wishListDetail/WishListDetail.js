import { FlatList, Image, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import GeneralProduct from '../../components/Products/GeneralProduct';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { DeleteWishlist, ServiceDeleteProductFromWishList, ServiceGetWishListProducts, ServicePostProductToWishList } from '../../services/AppService';
import { commonStyle, showToastHandler } from '../../helpers/common';
import { SheetManager } from 'react-native-actions-sheet';
import Add from '../../assets/images/add-icon.svg';
import Cross from '../../assets/images/cross-icon.svg';
import { useNavigation } from '@react-navigation/native';
import AppConfig from '../../helpers/config';
import Toast from 'react-native-toast-message';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { useDispatch } from 'react-redux';
import { setAddToCart } from '../../store/slices/loginConfigSlice';

const WishListDetail = ({ route }) => {
    const { wishListId, wishListName, wishlists } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [openWishListModal, setOpenWishListModal] = useState({ open: false, data: null });

    useEffect(() => {
        getProductsForThisWishList();
    }, [search]);

    const getProductsForThisWishList = () => {
        ServiceGetWishListProducts(wishListId, search).then(response => {
            console.log({ response });
            setProducts(response?.data?.data);
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const handleOptions = () => {
        SheetManager.show('example-two', {
            payload: {
                header: 'Choose your action',
                actions: [
                    { title: 'Edit wishlist', value: 'edit' },
                    { title: 'Delete wishlist', value: 'delete' },
                    { title: 'Share', value: 'share' },
                    { title: 'Make it public', value: 'public' },
                ],
                filterHandler: (_action) => {
                    if (_action === 'edit') {
                        navigation.navigate('CreateWishList', { wishListData: { name: wishListName, id: wishListId } })
                    } else if (_action === 'delete') {
                        dispatch(setActivityIndicator(true));
                        DeleteWishlist(wishListId).then(async (response) => {
                            console.log({ response });
                            dispatch(setActivityIndicator(false));
                            Toast.show({
                                type: 'success',
                                text1: 'Success',
                                text2: response?.message,
                            });
                            navigation.pop();
                        }).catch(e => {
                            showToastHandler(e, dispatch);
                        });
                    }
                }
            }
        });
    }

    const onProductOptionClick = (id) => {
        SheetManager.show('example-two', {
            payload: {
                header: 'Choose your action',
                actions: [
                    { title: 'Remove from wish list', value: 'Remove' },
                    { title: 'Move to other list', value: 'Move' },
                    { title: 'Copy to other list', value: 'Copy' },
                    { title: 'Add to cart', value: 'Cart' },
                ],
                filterHandler: (_action) => filterHandler(_action, id)
            }
        });
    }

    const filterHandler = (action, productId) => {
        if (action === 'Move' || action === 'Copy') {
            console.log({ action }, { productId });
            setTimeout(() => {
                setOpenWishListModal({ open: true, data: { action, productId } });
            }, Platform.OS === "ios" ? 200 : 0);
        } else if (action === 'Remove') {
            ServiceDeleteProductFromWishList(wishListId, productId)
                .then(response => {
                    console.log({ response });
                    getProductsForThisWishList();
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: response?.data?.message
                    });
                }).catch(e => {
                    showToastHandler(e);
                });
        } else if (action === 'Cart') {
            dispatch(setAddToCart(products.find(p => p.id === productId)));
        }
    }

    const handleMoveCopyAction = (newWishListId) => {
        ServicePostProductToWishList(
            newWishListId, // target Wishlist
            openWishListModal?.data?.productId, // action product
            openWishListModal?.data?.action?.toLowerCase(), // action
            wishListId, // current product list
        ).then(response => {
            console.log({ response });
            getProductsForThisWishList();
            setOpenWishListModal({ open: false, data: null });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.data?.message
            });
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} optionIcon={true} handleOptions={() => onProductOptionClick(item?.id)} />
            </View>
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
                <Text style={styles.name}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={wishListName || ''} iconType='options' handleOptions={handleOptions} />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <FlatList
                    horizontal={false}
                    data={products}
                    removeClippedSubviews={true}
                    numColumns={2}
                    key={(index) => 'wishlist' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {openWishListModal?.open &&
                <View style={{}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openWishListModal?.open}
                        onRequestClose={() => setOpenWishListModal({ open: false, data: null })}
                        style={{ width: '90%', height: '50%' }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setOpenWishListModal({ open: false, data: null })}>
                                        <Cross />
                                    </TouchableOpacity>
                                    <Text style={styles.title}>Select wish list</Text>
                                    <TouchableOpacity onPress={() => {
                                        setOpenWishListModal({ open: false, data: null });
                                        navigation.navigate('CreateWishList');
                                    }}>
                                        <Add />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 16 }}>
                                    <FlatList
                                        horizontal={false}
                                        removeClippedSubviews={true}
                                        data={wishlists}
                                        numColumns={2}
                                        key={(index) => 'wishlist' + index + 'product'}
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

export default WishListDetail

const styles = StyleSheet.create({
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
        ...commonStyle('500', 20, 'primaryColorA')
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
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});