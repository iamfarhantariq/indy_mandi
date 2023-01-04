import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AppStyle from '../../assets/styles/AppStyle'
import GeneralProduct from './GeneralProduct'

const ProductSection = ({ title, items = [], BG = '' }) => {
    const _renderItem = ({ item, index }) => {
        return (
            <GeneralProduct item={item} key={index} index={index} />
        )
    }

    return (
        <ImageBackground
            resizeMode='contain'
            source={BG}
            style={{ paddingVertical: BG ? 10 : 0 }}
        >
            <View>
                <Text style={styles.heading}>{title}</Text>
                <FlatList
                    horizontal
                    data={items}
                    key={(index) => title + index + 'product'}
                    renderItem={_renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    )
}

export default ProductSection

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginLeft: 16,
        marginBottom: 8
    }
})