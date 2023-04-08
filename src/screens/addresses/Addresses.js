import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Dots from '../../assets/images/three-dots.svg';
import { commonStyle, showToastHandler } from '../../helpers/common';
import { DeleteStoreAddress, GetUserAddresses } from '../../services/AppService';
import { useDispatch } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';

const Addresses = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        isFocus && getUserAddresses();
    }, [isFocus]);

    const getUserAddresses = () => {
        dispatch(setActivityIndicator(true));
        GetUserAddresses().then((response) => {
            console.log({ response });
            setAddresses(response?.data?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const deleteAddress = (id) => {
        dispatch(setActivityIndicator(true));
        DeleteStoreAddress(id).then((response) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.message,
            });
            getUserAddresses();
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const filterHandler = (action, id) => {
        console.log({ action }, { id });
        if (action === 'delete') {
            deleteAddress(id);
        } else {
            navigation.navigate('CreateAddress', { addressData: addresses?.find(f => f?.id === id) })
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.addContainer}>
                <View>
                    <Text style={styles.title}>{item?.type}</Text>
                    <Text style={styles.address}>{item?.address}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    SheetManager.show('example-two', {
                        payload: {
                            header: 'Choose your action',
                            actions: [
                                { title: 'Edit', value: 'edit' },
                                { title: 'Delete', value: 'delete' }
                            ],
                            filterHandler: (_action) => filterHandler(_action, item?.id)
                        }
                    });
                }}>
                    <Dots />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Addresses'} iconType='add' route='CreateAddress' />
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    removeClippedSubviews={true}
                    data={addresses}
                    key={(index) => 'address' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default Addresses

const styles = StyleSheet.create({
    addContainer: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        ...commonStyle('600', 14, 'primaryColorA'),
        lineHeight: 19.07
    },
    address: {
        ...commonStyle('300', 14, 'primaryColorA'),
        lineHeight: 19.07
    }
})