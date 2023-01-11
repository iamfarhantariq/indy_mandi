import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'

const PickForYouItem = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <Image source={item.imageSource} resizeMode='cover'
                style={{ height: 200, width: 200 }} />
            <View style={{ padding: 8, backgroundColor: AppStyle.colorSet.primaryColorC }}>
                <Text style={styles.name}>
                    {item?.name}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                    {item.description}
                </Text>
            </View>
        </View>
    )
}

export default PickForYouItem

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 271,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 8
    },
    name: {
        fontWeight: '600',
        fontSize: 14,
        color: AppStyle.colorSet.primaryColorA,
        lineHeight: 19.07,
        marginBottom: 4,
    },
    description: {
        color: AppStyle.colorSet.primaryColorB,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16.34
    }
})