import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'
import SmallButton from '../SmallButton'
import ReviewItem from './ReviewItem'

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
        <ReviewItem item={item} />
    )

    return (
        <View style={{ marginHorizontal: 16 }}>
            <Text style={styles.title}>Reviews (487)</Text>
            <View>
                <FlatList
                    data={data}
                    nestedScrollEnabled
                    key={index => 'review' + index + 'item'}
                    renderItem={_renderItem}
                    horizontal={false}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
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
    }
})