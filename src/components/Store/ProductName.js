import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import StarRating from './StarRating';
import FavBlank from '../../assets/images/fav-blank.svg';
import FavLiked from '../../assets/images/fav-liked.svg';
import { commonStyle } from '../../helpers/common';
import { ServiceGetWishListListingForUser, ServicePostProductToWishList } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';
import { SheetManager } from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';

const ProductName = ({ productDetail }) => {
    const navigation = useNavigation();
    const loginConfig = useSelector(getLoginConfig);
    const [liked, setLiked] = useState(productDetail?.is_liked || false);

    const getSortedArray = () => {
        try {
            return productDetail?.categories_path?.sort((a, b) => Number(a?.level) - Number(b?.level))
        } catch (e) {
            console.log({ e });
        }
    };

    const addToWishList = (wishListId) => {
        setLiked(true);
        ServicePostProductToWishList(wishListId, productDetail?.id).then(response => {
            console.log({ response });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.data?.message
            });
        }).catch(e => {
            setLiked(false);
            showToastHandler(e);
        });
    }

    const getWishListListing = () => {
        if (!liked) {
            ServiceGetWishListListingForUser().then(response => {
                console.log({ response });
                const data = response?.data?.data;
                SheetManager.show('example-two', {
                    payload: {
                        header: 'Add to:',
                        actions: data?.map(w => ({ title: w?.name, value: w?.id })),
                        filterHandler: (wishListId) => addToWishList(wishListId)
                    }
                });
            }).catch(e => {
                showToastHandler(e);
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.levelsContainer}>
                        {getSortedArray()?.map((lvl, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('MainCategoryScreen', { category: lvl })}>
                                    <Text style={styles.nestedCategories}>
                                        {lvl?.name}{getSortedArray()?.length - 1 === index ? '' : ' > '}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={styles.title}>{productDetail?.name}</Text>
                    <View style={{ height: 20, width: 110, marginBottom: 4 }}>
                        <StarRating rating={4} />
                    </View>
                </View>
                {loginConfig?.isLogin &&
                    loginConfig?.user?.role === 'u' &&
                    <TouchableOpacity onPress={getWishListListing} style={{ marginLeft: 16 }}>
                        {liked ? <FavLiked /> : <FavBlank />}
                    </TouchableOpacity>}
            </View>
            <Text style={styles.price} numberOfLines={1} lineBreakMode='tail'>
                ₹{productDetail?.offer_price ? productDetail?.offer_price : productDetail?.price}
                {productDetail?.price && productDetail?.offer_price &&
                    <Text style={styles.description}>
                       {" "} <Text style={{ textDecorationLine: 'line-through' }}>₹{productDetail?.price}</Text>
                    </Text>}
            </Text>
        </View>
    )
}

export default ProductName

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    nestedCategories: {
        ...commonStyle('500', 12, 'textSecondary'),
        marginBottom: 4
    },
    title: {
        ...commonStyle('400', 20, 'primaryColorA'),
        marginBottom: 4
    },
    price: {
        ...commonStyle('700', 24, 'primaryColorA'),
    },
    description: {
        ...commonStyle('500', 12, 'textSecondary'),
    },
    levelsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})