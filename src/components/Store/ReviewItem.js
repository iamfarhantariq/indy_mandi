import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle } from '../../helpers/common'

const ReviewItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.reviewText}>{item.review}</Text>
            <View style={{ flexDirection: 'row' }}>
                {item.pictures.map((p, i) => (
                    <Image key={i} source={{ uri: p }}
                        style={styles.imageStyle}
                        resizeMode="cover" />
                ))}
            </View>
            <Text style={styles.userText}>
                {item.user}
                <Text>{item.date}</Text>
            </Text>
        </View>
    )
}

export default ReviewItem

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    reviewText: {
        ...commonStyle('400', 12, 'primaryColorA'),
        lineHeight: 16.34,
    },
    imageStyle: {
        height: 32,
        width: 32,
        marginRight: 8,
        marginVertical: 4,
        borderRadius: 4
    },
    userText: {
        ...commonStyle('400', 11, 'textSecondary'),
        marginBottom: 8
    }
})