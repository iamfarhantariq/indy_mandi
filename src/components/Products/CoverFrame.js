import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import AppConfig from '../../helpers/config'

const CoverFrame = ({ item, index, detailed = true, flex = false }) => {

    const flexStyle = flex ? { ...styles.flexImageContainer } :
        { ...styles.imageContainer }

    return (
        <View>
            <ImageBackground
                resizeMode='cover'
                source={{uri: item?.image}}
                style={flexStyle}
                imageStyle={{ borderRadius: 8 }}
            >
                <View style={styles.insideContainer}>
                    {detailed ?
                        <>
                            <Text style={styles.priceText}>
                                {item?.price}
                            </Text>
                            <Text style={styles.nameText}>
                                {item?.name}
                            </Text>
                            <Text style={styles.subtitleText}>
                                {item?.subtitle}
                            </Text>
                        </> :
                        <Text style={styles.nameText}>
                            {item?.title}
                        </Text>
                    }
                </View>
                <View style={{ ...styles.darkBackground, height: detailed ? 70 : 35 }} />
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
    flexImageContainer: {
        height: AppConfig.windowWidth - (16 * 2),
        width: AppConfig.windowWidth - (16 * 2),
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