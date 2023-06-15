import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { SheetManager } from 'react-native-actions-sheet'
import { useDispatch } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { DeletePaymentModes, GetPaymentModes } from '../../services/AppService'
import { commonStyle, showToastHandler } from '../../helpers/common';
import Toast from 'react-native-toast-message';
import Dots from '../../assets/images/three-dots.svg';

const AllPaymentMode = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        isFocus && getPaymentModes();
    }, [isFocus]);

    const getPaymentModes = () => {
        dispatch(setActivityIndicator(true));
        GetPaymentModes().then((response) => {
            console.log({ response });
            setPayments(response?.data?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const deletePaymentMode = (id) => {
        dispatch(setActivityIndicator(true));
        DeletePaymentModes(id).then((response) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.message,
            });
            getPaymentModes();
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const filterHandler = (action, id) => {
        console.log({ action }, { id });
        if (action === 'delete') {
            deletePaymentMode(id);
        } else {
            navigation.navigate('CreatePaymentMode', { paymentData: payments?.find(f => f?.id === id) })
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.addContainer}>
                <View>
                    <Text style={styles.title}>{item?.type}</Text>
                    {item?.type !== 'QRCode' ? <Text style={styles.address}>{item?.detail}</Text> :
                        <View style={{ margin: 16 }}>
                            <Image resizeMode='cover' source={{ uri: item?.image }} style={{ height: 150, width: 150 }} />
                        </View>
                        }
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
            <HeaderWithBack title={'Payment Modes'} iconType='add' route='CreatePaymentMode' />
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    data={payments}
                    key={(index) => 'payment' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default AllPaymentMode

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