import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Dots from '../../assets/images/three-dots.svg';
import { commonStyle } from '../../helpers/common';

const Addresses = () => {
    const items = [
        { type: 'Home', address: '244, Street 1, Lahore' },
        { type: 'Office', address: '2nd floor Plaza Noor, Gulberg Lahore' },
        { type: 'Home 2', address: '2nd floor Plaza Noor, Gulberg Lahore' }
    ]

    const _renderItem = ({ item, index }) => (
        <View style={styles.addContainer}>
            <View>
                <Text style={styles.title}>{item.type}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
            <TouchableOpacity>
                <Dots />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Addresses'} iconType='add' route='CreateAddress' />
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