import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { commonStyle, showToastHandler } from '../../helpers/common';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ServiceGetProductsForCollection, ServicePostNewProducts } from '../../services/AppService'
import { useEffect } from 'react'
import GeneralProduct from '../../components/Products/GeneralProduct'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import Toast from 'react-native-toast-message';

const ProductsToCollection = ({ route }) => {
    const { collectionId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectAll, setSelectAll] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (collectionId) {
            getProductsForCollection();
        } else {
            navigation.pop();
        }
    }, []);

    useEffect(() => {
        if (page > 1) {
            getProductsForCollection();
        }
    }, [page]);

    const getProductsForCollection = () => {
        setLoading(true);
        ServiceGetProductsForCollection(collectionId, page).then(response => {
            console.log({ response });
            const _products = response?.data?.data?.map(p => ({ ...p, isSelected: false }))
            if (page === 1) {
                setProducts(_products);
            } else {
                setProducts([...products, ..._products])
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        })
    }

    const handleCheckBox = (id) => {
        const _products = [...products];
        const _index = _products.findIndex(f => f?.id === id);
        _products[_index].isSelected = !_products[_index].isSelected;
        setProducts(_products);
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct
                    item={item}
                    index={index}
                    flex={true}
                    checkBox={true}
                    checkBoxValue={item?.isSelected || false}
                    handleCheckBox={() => handleCheckBox(item?.id)}
                />
            </View>
        )
    }

    const handleDone = () => {
        const payload = { products: products.filter(p => (p?.isSelected)).map(m => (m?.id)) };
        dispatch(setActivityIndicator(true));
        console.log(payload);
        ServicePostNewProducts(collectionId, payload).then(response => {
            console.log({ response });
            dispatch(setActivityIndicator(false));
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Success',
            });
            navigation.pop();
        }).catch(e => {
            showToastHandler(e, dispatch);
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Add products to collection'} />

            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={selectAll}
                        onValueChange={(v) => {
                            setProducts(products.map(p => ({ ...p, isSelected: v })))
                            setSelectAll(!selectAll)
                        }}
                        boxType='square'
                        onFillColor={AppStyle.colorSet.primaryColorA} // IOS
                        onTintColor={AppStyle.colorSet.primaryColorA} // IOS
                        onCheckColor={AppStyle.colorSet.primaryColorA} // IOS
                        tintColors={{ true: AppStyle.colorSet.primaryColorA, false: AppStyle.colorSet.primaryColorA }} // Android
                        style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                    <Text style={styles.label}>Select all</Text>
                </View>

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
            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Done'} fill={true} handleClick={handleDone} />
            </View>
        </View>
    )
}

export default ProductsToCollection

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 18,
    },
    label: {
        ...commonStyle('600', 14, 'primaryColorA'),
        textAlignVertical: 'center',
        marginLeft: 8,
        marginTop: Platform.OS === 'ios' ? -10 : 0
    },
})