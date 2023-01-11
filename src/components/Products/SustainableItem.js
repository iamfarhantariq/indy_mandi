import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'

const SustainableItem = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <Image source={item.imageSource} resizeMode='cover'
                style={{ height: 200, width: 200 }} />
            <View style={{ padding: 8, backgroundColor: AppStyle.colorSet.primaryColorA }}>
                <Text style={styles.name}>
                    {item?.name}
                </Text>
            </View>
        </View>
    )
}

export default SustainableItem

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 235,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 8
    },
    name: {
        fontWeight: '600',
        fontSize: 14,
        color: AppStyle.colorSet.whiteColor,
        lineHeight: 19.07,
        textAlign: 'center'
    },
})