import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppConfig from '../../helpers/config';
import AppLogo from '../../assets/images/app-logo.svg';
import QRCode from '../../assets/images/qr-code-icon.svg';
import BellIconActive from '../../assets/images/bell-icon-counter.svg';
import BellIcon from '../../assets/images/bell-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { useNavigation } from '@react-navigation/native';
import { ServiceGetCategories } from '../../services/ProductService';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/slices/productsSlice';
import { showToastHandler } from '../../helpers/common';

const HomeHeader = ({ filters = true, QR_Code = '' }) => {
    const colors = ['#C5F1C4', '#CCDFD6', '#E8CDDE', '#E9DBD7', '#D3E8EB']
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        setIsLoading(true);
        ServiceGetCategories().then(response => {
            console.log({ response });
            let _items = [];
            let colorIndex = 0;
            response?.data?.forEach(_item => {
                _items.push({ id: _item?.id, name: _item?.name, color: colors[colorIndex] });
                colorIndex < 4 ? colorIndex++ : colorIndex = 0;
            })
            setItems(_items);
            dispatch(setCategories(response?.data));
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
            showToastHandler(e);
        })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('NestedCategoriesTypeScreen')}>
                <View style={{ ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0 }}>
                    <Text style={styles.chipText}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.logosContainer}>
                <AppLogo height={26.35} width={69} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {QR_Code &&
                        <TouchableOpacity onPress={() => navigation.navigate('QRCodeScreen', { QR_Code })}>
                            <QRCode />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <BellIconActive />
                    </TouchableOpacity>
                </View>
            </View>
            {filters && <View style={{ marginBottom: 8 }}>
                <FlatList
                    horizontal
                    data={items}
                    key={(index) => 'header' + index + 'chip'}
                    renderItem={_renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>}
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        marginTop: AppConfig.statusBarHeight,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
    },
    logosContainer: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chipContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20
    },
    chipText: {
        fontSize: 14,
        color: AppStyle.colorSet.blackColor + '60',
        letterSpacing: -0.5,
        fontWeight: '500'
    }
})