import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'
import SmallButton from '../SmallButton'

const Reviews = () => {

    const data = [
        {
            review: 'Easily my new favorite Bag!! I’ve used it non-stop since it came in the mail. I love it!!',
            pictures: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
            ],
            user: 'Rewathi kanna •', date: '15 May, 2022'
        },
        {
            review: 'Easily my new favorite Bag!! I’ve used it non-stop since it came in the mail. I love it!!',
            pictures: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
            ],
            user: 'Rewathi kanna •', date: '15 May, 2022'
        },
        {
            review: 'Easily my new favorite Bag!! I’ve used it non-stop since it came in the mail. I love it!!',
            pictures: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
            ],
            user: 'Rewathi kanna •', date: '15 May, 2022'
        }
    ]

    const _renderItem = ({ item, index }) => (
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

    return (
        <View style={{ marginHorizontal: 16 }}>
            <Text style={styles.title}>Reviews (487)</Text>
            <FlatList
                data={data}
                nestedScrollEnabled
                key={index => 'review' + index + 'item'}
                renderItem={_renderItem}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ marginVertical: 8 }}>
                <SmallButton text={'See all reviews'} />
            </View>
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    title: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8
    },
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