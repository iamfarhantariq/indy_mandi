import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { commonStyle, showToastHandler } from '../../helpers/common';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ServiceGetProductsForCollection } from '../../services/AppService'
import { useEffect } from 'react'

const ProductsToCollection = ({ route }) => {
    const { collectionId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (collectionId) {
            getProductsForCollection();
        } else {
            navigation.pop();
        }
    }, []);

    const getProductsForCollection = () => {
        ServiceGetProductsForCollection(collectionId).then(response => {
            console.log({ response });
            // if (page === 1) {
            //     setProducts(response?.data);
            // } else {
            //     setProducts([...products, ...response?.data])
            // }
            // setLoading(false);
            // setLastPage(response?.meta?.last_page);
        }).catch(e => {
            // setLoading(false);
            showToastHandler(e);
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Add products to collection'} />

            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={selectAll}
                        onValueChange={() => setSelectAll(!selectAll)}
                        boxType='square'
                        onFillColor={AppStyle.colorSet.primaryColorB} // IOS
                        onTintColor={AppStyle.colorSet.whiteColor} // IOS
                        onCheckColor={AppStyle.colorSet.whiteColor} // IOS
                        tintColors={{ true: '#713A74', false: '#713A74' }} // Android
                        style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                    <Text style={styles.label}>Select all</Text>
                </View>

            </View>
            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Done'} fill={true} handleClick={() => null} />
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