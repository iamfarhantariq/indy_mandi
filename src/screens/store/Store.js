import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import BackLarge from '../../assets/images/back-large.svg';
import AppConfig from '../../helpers/config';
import { commonStyle } from '../../helpers/common';
import StarRating from '../../components/Store/StarRating';
import { useNavigation } from '@react-navigation/native';
import Van from '../../assets/images/store-van.svg';
import Response from '../../assets/images/store-response.svg';
import TabViewSection from '../../components/Store/TabViewSection';

const Store = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <ImageBackground
                resizeMode='cover'
                source={require('../../assets/images/demo-cover-bg.png')}
                style={styles.imageContainer}
            >
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.pop()}>
                    <BackLarge />
                </TouchableOpacity>

                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../assets/images/demo-category-image.jpeg')}
                        resizeMode='cover'
                        style={styles.imageStyle}
                    />
                </View>
            </ImageBackground>
            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                <Text style={styles.name}>Nike - Original store</Text>
                <Text style={styles.description}>From men to ladies, wide range of variety</Text>
                <Text style={styles.description}>Ahmedabad, Gujarat</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 20, width: 90 }}>
                        <StarRating rating={4} />
                    </View>
                    <Text style={styles.ratingText}>(4/5) 500 sales</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <StoreDetail Icon={<Van />} text={'Smooth Dispatcher'} description='Has a history of dispatching orders on time' />
                <StoreDetail Icon={<Response />} text={'Speedy Replies'} description='Has a history of dispatching orders on time' />
            </View>

            <TabViewSection />
        </View>
    )
}

const StoreDetail = ({ Icon, text, description }) => (
    <View style={styles.detailContainer}>
        {Icon}
        <Text style={styles.storeSText}>{text}</Text>
        <Text style={styles.storeDText} lineBreakMode='tail' numberOfLines={2}>{description}</Text>
    </View>
)

export default Store

const styles = StyleSheet.create({
    imageContainer: {
        width: AppConfig.screenWidth,
        height: 160,
    },
    buttonContainer: {
        position: 'absolute',
        left: 16,
        top: AppConfig.statusBarHeight
    },
    profileContainer: {
        position: 'absolute',
        top: 100,
        width: AppConfig.screenWidth,
        alignItems: 'center',
    },
    imageStyle: {
        width: 112,
        height: 112,
        borderRadius: 99,
        borderWidth: 8,
        borderColor: AppStyle.colorSet.borderLightGrayColor
    },
    name: {
        ...commonStyle('400', 20, 'primaryColorA'),
        marginTop: 60,
        marginBottom: 4
    },
    description: {
        ...commonStyle('400', 12, 'textSecondary'),
        lineHeight: 16.34,
        marginBottom: 4
    },
    ratingText: {
        ...commonStyle('500', 14, 'primaryColorA'),
        marginLeft: 16
    },
    detailContainer: {
        height: 114,
        width: (AppConfig.screenWidth / 2) - 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    storeSText: {
        ...commonStyle('500', 14, 'primaryColorC'),
        marginVertical: 4
    },
    storeDText: {
        ...commonStyle('400', 14, 'textSecondary'),
    }
})