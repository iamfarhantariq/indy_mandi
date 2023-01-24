import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import StarFilled from '../../assets/images/star-filled.svg';
import StarBlank from '../../assets/images/star-blank.svg';

const StarRating = ({ rating = 5 }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {[1, 2, 3, 4, 5].map((a, i) => (
                <View key={a + i} style={{ marginRight: 2 }}>{i + 1 <= rating ? <StarFilled /> : <StarBlank />}</View>
            ))}
        </View>
    )
}

export default StarRating;