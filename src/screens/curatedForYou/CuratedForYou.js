import { FlatList, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppConfig from '../../helpers/config'
import PicksForYouSection from '../../components/Products/PicksForYouSection'
import SustainableSection from '../../components/SustainableSection'

const CuratedForYou = () => {

    const items = [
        { name: '9-5 work bags', price: 'From $40 onwards', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: '9-5 work bags', price: 'From $40 onwards', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: '9-5 work bags', price: 'From $40 onwards', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: '9-5 work bags', price: 'From $40 onwards', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ];

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                marginBottom: 16,
                paddingRight: index % 2 == 0 ? 8 : 0,
                paddingLeft: index % 2 == 0 ? 0 : 8
            }}>
                <Image source={item.imageSource} resizeMode='cover'
                    style={styles.flexImageContainer} />
                <Text style={styles.productName}>
                    {item?.name}
                </Text>
                <Text style={styles.secondPrice}>
                    {item.price}
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Curated for you'} />
            <ScrollView showsVerticalScrollIndicator={false}
                nestedScrollEnabled style={{ flex: 1, paddingTop: 16 }}>
                <Text style={styles.heading}>Best selling</Text>

                <FlatList
                    data={items}
                    nestedScrollEnabled
                    key={index => 'best' + index + 'selling'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 8, marginHorizontal: 16 }}
                />

                <PicksForYouSection />

                <SustainableSection />

            </ScrollView>
        </View>
    )
}

export default CuratedForYou

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8,
        marginHorizontal: 16
    },
    flexImageContainer: {
        height: (AppConfig.windowWidth / 2) - 24,
        width: (AppConfig.windowWidth / 2) - 24,
        borderRadius: 8,
    },
    productName: {
        fontWeight: '600',
        fontSize: 14,
        color: AppStyle.colorSet.primaryColorB,
        lineHeight: 19.07,
        marginTop: 4
    },
    secondPrice: {
        color: AppStyle.colorSet.primaryColorA,
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16.34
    }
})