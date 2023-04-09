import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppConfig from '../../helpers/config';
import BackLarge from '../../assets/images/back-large.svg';
import { useNavigation } from '@react-navigation/native';
import AppStyle from '../../assets/styles/AppStyle';

const ImageHeader = ({ image, description }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            resizeMode='cover'
            source={{ uri: image }}
            style={styles.imageContainer}
        >
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.pop()}>
                <BackLarge />
            </TouchableOpacity>

            {description && <View style={styles.insideContainer}>
                <Text style={styles.nameText}>
                    {description}
                </Text>
            </View>}
            <View style={styles.darkBackground} />
        </ImageBackground>
    )
}

export default ImageHeader

const styles = StyleSheet.create({
    imageContainer: {
        width: AppConfig.screenWidth,
        height: 300,
        // marginTop: -Math.abs(AppConfig.statusBarHeight),
    },
    buttonContainer: {
        position: 'absolute',
        left: 16,
        top: AppConfig.statusBarHeight
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
        backgroundColor: AppStyle.colorSet.blackColor + '50',
        height: 35
    },
    nameText: {
        fontWeight: '600',
        fontSize: 14,
        color: AppStyle.colorSet.whiteColor
    },
})