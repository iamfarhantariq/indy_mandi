import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useNavigation } from '@react-navigation/native'
import { commonStyle, showToastHandler } from '../../helpers/common'
import Button from '../../components/Button'
import { ServiceGetUserPayments } from '../../services/AppService'
import { useDispatch } from 'react-redux'

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getPaymentHistory();
    }, []);

    console.log({ payments });

    const getPaymentHistory = () => {
        setLoading(true);
        ServiceGetUserPayments(page).then(response => {
            console.log({ response });
            if (page === 1) {
                setPayments(response?.data?.data);
            } else {
                setPayments([...payments, ...response?.data?.data])
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        })
    }

    const capitalize = (key) => key.charAt(0).toUpperCase() + key.slice(1);

    const getHeaders = () => {
        let _payments = [...payments].map(p => {
            delete p.id;
            return p;
        });
        return Object.keys(Object.assign({}, ..._payments)).map(k => capitalize(k));
    }

    const _renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40%' }}>
                    {payments?.length && getHeaders().map((_item, _index) => (
                        <Text key={_index + _item} style={styles.itemDetailText}>
                            {_item}
                        </Text>
                    ))}
                </View>
                <View style={{ width: '60%' }}>
                    {Object.keys(item).map((_item, _index) => (
                        <Text key={index + _index} style={styles.itemDetailTextR}>
                            {item[_item]}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={{ width: 108, marginTop: 8 }}>
                <Button text={'Invoice'} height={36} fill={true} handleClick={() => {
                    navigation.navigate('Invoice', { id: payments[index]?.id })
                }} />
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Payment history'} />

            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    data={payments}
                    key={(index) => 'address' + index + 'item'}
                    renderItem={_renderItem}
                    
                    showsVerticalScrollIndicator={false}
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

export default PaymentHistory

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingBottom: 16,
    },
    itemDetailText: {
        ...commonStyle('400', 14, 'textSecondary'),
        marginTop: 8,
    },
    itemDetailTextR: {
        ...commonStyle('400', 14, 'primaryColorA'),
        marginTop: 8,
    }
})