import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { commonStyle } from '../../helpers/common'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useState } from 'react'

const PaymentScreen = () => {
    const navigation = useNavigation();
    const [coupon, setCoupon] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Payment'} />

            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <View style={styles.container}>
                    <Text style={styles.pTypeT}>One time payment</Text>
                    <Text style={styles.priceTextB}>₹ 1000 <Text style={{ fontSize: 16 }}>+ 18% gst</Text></Text>
                    <View style={styles.sTContainer}>
                        <Text style={styles.sTText}>Card Subtotals:</Text>
                        <Text style={styles.sTText}>₹ 1180</Text>
                    </View>
                    <View style={{ ...styles.sTContainer, alignItems: 'flex-start', borderBottomWidth: 0 }}>
                        <View>
                            <Text style={styles.sTText}>Order Subtotals:</Text>
                            <Text style={styles.sTDText}>All prices are in Indian Rupees</Text>
                        </View>
                        <Text style={styles.sTText}>₹ 1180</Text>
                    </View>
                </View>

                <InputFieldBase
                    title={'Coupon'}
                    placeholder={'Have a coupon code? Apply here'}
                    value={coupon}
                    onTextChange={(t) => setCoupon(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Buy advert'} fill={true} handleClick={() => navigation.pop(4)} />
            </View>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        borderWidth: 1,
        backgroundColor: AppStyle.colorSet.textSecondary + '05',
        borderRadius: 8,
        marginBottom: 16
    },
    pTypeT: {
        ...commonStyle('700', 12, 'primaryColorA'),
    },
    priceTextB: {
        ...commonStyle('600', 40, 'primaryColorA'),
        lineHeight: 54.48
    },
    sTContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    sTText: {
        marginTop: 24,
        ...commonStyle('700', 16, 'primaryColorA'),
    },
    sTDText: {
        ...commonStyle('400', 12, 'textSecondary'),
        lineHeight: 16.34
    }
})