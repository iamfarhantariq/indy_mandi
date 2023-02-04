import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useNavigation } from '@react-navigation/native'
import { commonStyle } from '../../helpers/common'
import SmallButton from '../../components/SmallButton'
import Button from '../../components/Button'

const PaymentHistory = () => {
    const navigation = useNavigation();

    const items = [
        {
            issueDate: '03 Jan, 2023',
            method: 'Card',
            currency: 'INR',
            ammount: '1,820,999',
            status: 'Captured'
        },
        {
            issueDate: '03 Jan, 2023',
            method: 'Card',
            currency: 'INR',
            ammount: '1,820,999',
            status: 'Captured'
        },
    ]

    const _renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40%' }}>
                    {['Issue date', 'Method', 'Currency', 'Ammount', 'Status'].map((_item, _index) => (
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
                <Button text={'Invoice'} height={36} fill={true} handleClick={() => navigation.navigate('Invoice')} />
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Payment history'} />

            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    data={items}
                    key={(index) => 'address' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
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