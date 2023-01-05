import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import CoverFrame from './CoverFrame'

const CoverSection = ({ title, detailed = true, discoverOption }) => {

    const items = [
        { price: '$89.99', name: 'Floran shiffon dress', subtitle: 'All birds Couture, Calcutta', imageSource: require('../../assets/images/demo-cover-bg.png') },
        { price: '$89.99', name: 'Floran shiffon dress', subtitle: 'All birds Couture, Calcutta', imageSource: require('../../assets/images/demo-cover-bg.png') },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <CoverFrame item={item} key={index} index={index} detailed={detailed} />
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>{title}</Text>
                {discoverOption && <Text style={styles.discoverText}>Discover</Text>}
            </View>
            <FlatList
                horizontal
                data={items}
                key={(index) => 'Indyview' + index + 'cover'}
                renderItem={_renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CoverSection;

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8
    },
    discoverText: {
        fontSize: 12,
        fontWeight: '400',
        color: AppStyle.colorSet.blackColor,
    }
})