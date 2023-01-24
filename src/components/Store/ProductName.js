import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StarRating from './StarRating';
import FavBlank from '../../assets/images/fav-blank.svg';
import { commonStyle } from '../../helpers/common';

const ProductName = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.nestedCategories}>{'Shoes > New arrival > Men > Nike '}</Text>
                    <Text style={styles.title}>New Nike girl shoe</Text>
                    <View style={{ height: 20, width: 110, marginBottom: 4 }}>
                        <StarRating rating={4} />
                    </View>
                </View>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                    <FavBlank />
                </TouchableOpacity>
            </View>
            <Text style={styles.price} numberOfLines={1} lineBreakMode='tail'>
                $80.77
                <Text style={styles.description}>
                    {"  "}
                    <Text style={{ textDecorationLine: 'line-through' }}>$390</Text>
                    {" "}
                    (20% OFF) inclusive all taxes)
                </Text>
            </Text>
        </View>
    )
}

export default ProductName

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    nestedCategories: {
        ...commonStyle('500', 12, 'textSecondary'),
        marginBottom: 4
    },
    title: {
        ...commonStyle('400', 20, 'primaryColorA'),
        marginBottom: 4
    },
    price: {
        ...commonStyle('700', 24, 'primaryColorA'),
    },
    description: {
        ...commonStyle('500', 12, 'textSecondary'),
    }
})