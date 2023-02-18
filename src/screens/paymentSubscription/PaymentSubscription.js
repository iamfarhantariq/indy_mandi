import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import Button from '../../components/Button'
import { commonStyle } from '../../helpers/common'

const PaymentSubscription = () => {
    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Payment'} />

            <View style={{ flex: 1, marginHorizontal: 16, paddingVertical: 16 }}>

                <View style={styles.container}>
                    <Text style={styles.pTypeT}>Standard Membership</Text>
                    <Text style={styles.pTypeDT}>Billing Cycle Montlhy</Text>
                    <Text style={styles.priceTextB}>₹ 300/month <Text style={{ fontSize: 16 }}>+ 18% gst</Text></Text>
                    <View style={styles.sTContainer}>
                        <Text style={styles.sTText}>Card Subtotals:</Text>
                        <Text style={styles.sTText}>₹ 354</Text>
                    </View>
                    <View style={{ ...styles.sTContainer, alignItems: 'flex-start', borderBottomWidth: 0 }}>
                        <View>
                            <Text style={styles.sTText}>Order Subtotals:</Text>
                            <Text style={styles.sTDText}>All prices are in Indian Rupees</Text>
                        </View>
                        <Text style={styles.sTText}>₹ 354</Text>
                    </View>
                </View>

            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Proceed to checkout'} fill={true} handleClick={() => null} />
            </View>
        </View>
    )
}

export default PaymentSubscription

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
        ...commonStyle('700', 16, 'primaryColorA'),
        marginBottom: 24
    },
    pTypeDT: {
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