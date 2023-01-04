import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'

const CoverFrame = ({ item, index }) => {
    return (
        <View>
            <ImageBackground
                resizeMode='cover'
                source={require('../../assets/images/demo-cover-bg.png')}
                style={styles.imageContainer}
                imageStyle={{ borderRadius: 8 }}
            >
                <View style={styles.insideContainer}>
                    <Text style={styles.priceText}>
                        {item?.price}
                    </Text>
                    <Text style={styles.nameText}>
                        {item?.name}
                    </Text>
                    <Text style={styles.subtitleText}>
                        {item?.subtitle}
                    </Text>
                </View>
                <View style={styles.darkBackground} />
            </ImageBackground>
        </View>
    )
}

export default CoverFrame

const styles = StyleSheet.create({
    imageContainer: {
        height: 303,
        width: 303,
        marginRight: 12,
    },
    insideContainer: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        zIndex: 1,
    },
    darkBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: AppStyle.colorSet.blackColor + '50'
    },
    priceText: {
        fontWeight: '600',
        fontSize: 16,
        color: AppStyle.colorSet.primaryColorC
    },
    nameText: {
        fontWeight: '600',
        fontSize: 14,
        color: AppStyle.colorSet.whiteColor
    },
    subtitleText: {
        fontWeight: '300',
        fontSize: 11,
        color: AppStyle.colorSet.whiteColor
    }
})