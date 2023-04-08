import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../Input/InputField'
import { useState } from 'react';
import ReviewItem from './ReviewItem';

const ReviewSectionStore = () => {
    const [search, setSearch] = useState('');

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
        <View style={{ flex: 1, marginVertical: 16 }}>
            <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'}
                filterIcon={true} filterHandler={() => null} />

            <View style={{ flex: 1, marginVertical: 16 }}>
                <FlatList
                    data={data}
                    nestedScrollEnabled
                    key={index => 'review' + index + 'item'}
                    renderItem={_renderItem}
                    horizontal={false}
                    
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ReviewSectionStore

const styles = StyleSheet.create({})