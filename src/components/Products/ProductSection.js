import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AppStyle from '../../assets/styles/AppStyle'
import GeneralProduct from './GeneralProduct'

const ProductSection = ({ title, items = [], BG = '', color = null, route = '' }) => {
    const navigation = useNavigation();

    const _renderItem = ({ item, index }) => {
        if (!item?.id && item?.action === 'See All') {
            return (
                <View style={styles.seeAllContainer}>
                    <Text style={styles.seeAll}>
                        {item?.action}</Text>
                </View>
            )
        }
        return (
            <GeneralProduct item={item} key={index} index={index} />
        )
    }

    return (
        <ImageBackground
            resizeMode='contain'
            source={BG}
            style={{
                paddingVertical: BG || color ? 10 : 0,
                backgroundColor: color ? color : 'transparent'
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate(route)}>
                <Text style={styles.heading}>{title}</Text>
            </TouchableOpacity>
            <View>
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
    },
    seeAll: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.whiteColor
    },
    seeAllContainer: {
        height: 136,
        width: 136,
        marginRight: 12,
        marginBottom: 2,
        borderRadius: 8,
        backgroundColor: AppStyle.colorSet.primaryColorB,
        justifyContent: 'center',
        alignItems: 'center'
    }
})