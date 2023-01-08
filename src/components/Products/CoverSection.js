import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import CoverFrame from './CoverFrame'
import { useNavigation } from '@react-navigation/native'

const CoverSection = ({ title, detailed = true, discoverOption }) => {
    const navigation = useNavigation();

    const items = [
        { price: '$89.99', name: 'Floran shiffon dress', subtitle: 'All birds Couture, Calcutta', imageSource: require('../../assets/images/demo-cover-bg.png') },
        { price: '$89.99', name: 'Floran shiffon dress', subtitle: 'All birds Couture, Calcutta', imageSource: require('../../assets/images/demo-cover-bg.png') },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen')}>
                <CoverFrame item={item} index={index} detailed={detailed} />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>{title}</Text>
                {discoverOption &&
                    <TouchableOpacity onPress={() => navigation.navigate('BlogsScreen')}>
                        <Text style={styles.discoverText}>Discover</Text>
                    </TouchableOpacity>
                }
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